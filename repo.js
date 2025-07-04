#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execSync, spawn } = require('child_process');

function collectPackages(root) {
  const result = [];
  function scan(dir, type) {
    const base = path.basename(dir);
    if (base === 'node_modules' || base === 'dist') return;
    const pkg = path.join(dir, 'package.json');
    if (fs.existsSync(pkg)) {
      const data = JSON.parse(fs.readFileSync(pkg, 'utf8'));
      result.push({ path: dir, type, name: data.name || path.basename(dir) });
    } else if (fs.existsSync(dir)) {
      fs.readdirSync(dir, { withFileTypes: true }).forEach((d) => {
        if (d.isDirectory()) scan(path.join(dir, d.name), type);
      });
    }
  }
  const libs = path.join(root, 'libs');
  if (fs.existsSync(libs))
    fs.readdirSync(libs).forEach((d) => scan(path.join(libs, d), 'lib'));
  const services = path.join(root, 'services');
  if (fs.existsSync(services))
    fs.readdirSync(services).forEach((d) =>
      scan(path.join(services, d), 'service'),
    );
  const apps = path.join(root, 'apps');
  if (fs.existsSync(apps))
    fs.readdirSync(apps).forEach((d) => scan(path.join(apps, d), 'app'));
  return result;
}

function filterPackages(pkgs, names) {
  if (!names.length) return pkgs;
  const map = new Map(pkgs.map((p) => [p.name, p]));
  return names.map((n) => map.get(n)).filter(Boolean);
}

function runNpm(pkg, args, exitOnFail = false) {
  console.log(`[${pkg.type}] ${pkg.name} > npm ${args}`);
  try {
    execSync(`npm ${args}`, {
      stdio: 'inherit',
      cwd: pkg.path,
      shell: process.platform === 'win32',
    });
    return true;
  } catch (err) {
    if (exitOnFail) {
      process.exit(err.status || 1);
    } else {
      process.exitCode = err.status || 1;
    }
    return false;
  }
}

function openTerminal(cwd, command) {
  const platform = process.platform;
  if (platform === 'win32') {
    spawn('cmd', ['/c', 'start', 'cmd', '/k', command], { cwd, detached: true }).unref();
  } else if (platform === 'darwin') {
    const script = `tell application "Terminal" to do script "cd ${cwd.replace(/"/g, '\\"')} && ${command}"`;
    spawn('osascript', ['-e', script], { detached: true }).unref();
  } else {
    const term = process.env.TERM_PROGRAM || 'x-terminal-emulator';
    spawn(term, ['-e', `bash -c 'cd "${cwd}" && ${command}; exec bash'`], { detached: true }).unref();
  }
}

function ensureLibsBuilt(libraries) {
  libraries.forEach((pkg) => {
    const nm = path.join(pkg.path, 'node_modules');
    const dist = path.join(pkg.path, 'dist');
    if (!fs.existsSync(nm)) {
      console.log(`[${pkg.type}] ${pkg.name} missing node_modules, running install`);
      runNpm(pkg, 'install', true);
    }
    if (!fs.existsSync(dist)) {
      console.log(`[${pkg.type}] ${pkg.name} missing dist, running build`);
      runNpm(pkg, 'run build', true);
    }
  });
}

function ensureDepsInstalled(packages) {
  packages.forEach((pkg) => {
    const nm = path.join(pkg.path, 'node_modules');
    if (!fs.existsSync(nm)) {
      if (pkg.type === 'app') {
        console.log(`[${pkg.type}] ${pkg.name} installing dependencies (--legacy-peer-deps)`);
        runNpm(pkg, 'install --legacy-peer-deps', true);
      } else if (pkg.type === 'service') {
        console.log(`[${pkg.type}] ${pkg.name} installing dependencies`);
        runNpm(pkg, 'install', true);
      }
    }
  });
}

function startPackages(packages) {
  if (!packages.length) return;
  packages.forEach((pkg) => {
    const script = pkg.type === 'service' ? 'start:dev' : 'start';
    console.log(`[${pkg.type}] ${pkg.name} > npm run ${script}`);
    openTerminal(pkg.path, `npm run ${script}`);
  });
}

function usage() {
  console.log(`Usage: node repo.js <command> [names...]
Commands:
  install                   install libs, apps then services
  start <names...>           run apps (npm start) or services (npm start:dev)
                             each launches in its own terminal window
                             use "node repo.js list" to view package names
  lint <service...>          npm run lint in services
  lint:fix [names...]        npm run lint:fix in packages
  prettier:check [names...]  npm run prettier:check in packages
  prettier:fix [names...]    npm run prettier:fix in packages
  build-libs <lib...>        npm run build in libs
  test <service...>          npm run test in services
  list [names...]            list packages (all types)
  run <script> [names...]    run arbitrary npm script in packages
Examples:
  node repo.js install
  node repo.js start Vyarna website-foundation-scg vy-person-identity
  node repo.js build-libs ez-logger ez-utils
  node repo.js list
  node repo.js run build vy-person-identity
`);
}

const all = collectPackages(__dirname);
const services = all.filter((p) => p.type === 'service');
const libs = all.filter((p) => p.type === 'lib');
const apps = all.filter((p) => p.type === 'app');

const [, , cmd, ...args] = process.argv;

switch (cmd) {
  case 'install': {
    function doInstall(targetPkgs) {
      const libsTarget = targetPkgs.filter((p) => p.type === 'lib');
      const appsTarget = targetPkgs.filter((p) => p.type === 'app');
      const servicesTarget = targetPkgs.filter((p) => p.type === 'service');

      const order = ['ez-logger', 'ez-utils', 'ez-kafka-producer'];
      const map = new Map(libsTarget.map((l) => [l.name, l]));
      const libsSorted = [];
      order.forEach((n) => {
        if (map.has(n)) {
          libsSorted.push(map.get(n));
          map.delete(n);
        }
      });
      libsSorted.push(
        ...Array.from(map.values()).sort((a, b) =>
          a.name.localeCompare(b.name),
        ),
      );

      libsSorted.forEach((pkg) => {
        runNpm(pkg, 'install', true);
        runNpm(pkg, 'run build', true);
      });

      appsTarget.forEach((pkg) => {
        // use legacy peer deps for apps to satisfy React Native requirements
        runNpm(pkg, 'install --legacy-peer-deps', true);
      });
      servicesTarget.forEach((pkg) => runNpm(pkg, 'install', true));
    }

    if (args.length === 0) {
      doInstall(all);
    } else {
      const selected = filterPackages(all, args);
      doInstall(selected);
    }
    break;
  }
  case 'start': {
    if (!args.length) {
      console.log(
        `Please specify which apps or services to start.
  Use \`node repo.js list\` to see available names.
  Example: node repo.js start Vyarna website-foundation-scg vy-person-identity
  Vyarna and website-foundation-scg are apps; vy-person-identity is a service.
  Starting everything at once has been disabled to avoid overloading your machine.`,
      );
      break;
    }

    console.log('Checking libraries before starting...');
    ensureLibsBuilt(libs);

    const targets = filterPackages(
      all.filter((p) => p.type === 'service' || p.type === 'app'),
      args,
    );

    console.log('Ensuring dependencies for selected packages...');
    ensureDepsInstalled(targets);

    startPackages(targets);
    break;
  }
  case 'lint':
    filterPackages(services, args).forEach((p) => runNpm(p, 'run lint'));
    break;
  case 'lint:fix':
    filterPackages(all, args).forEach((p) => runNpm(p, 'run lint:fix'));
    break;
  case 'prettier:check':
    filterPackages(all, args).forEach((p) => runNpm(p, 'run prettier:check'));
    break;
  case 'prettier:fix':
    filterPackages(all, args).forEach((p) => runNpm(p, 'run prettier:fix'));
    break;
  case 'build-libs':
    filterPackages(libs, args).forEach((p) => runNpm(p, 'run build'));
    break;
  case 'test':
    filterPackages(services, args).forEach((p) => runNpm(p, 'run test'));
    break;
  case 'list':
    filterPackages(all, args).forEach((p) => {
      console.log(`${p.type}\t${p.name}\t${p.path}`);
    });
    break;
  case 'run':
    const script = args.shift();
    if (!script) {
      usage();
      break;
    }
    filterPackages(all, args).forEach((p) => runNpm(p, `run ${script}`));
    break;
  default:
    usage();
}
