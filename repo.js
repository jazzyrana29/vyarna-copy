#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function collectPackages(root) {
  const result = [];
  function scan(dir, type) {
    const pkg = path.join(dir, 'package.json');
    if (fs.existsSync(pkg)) {
      const data = JSON.parse(fs.readFileSync(pkg, 'utf8'));
      result.push({ path: dir, type, name: data.name || path.basename(dir) });
    } else if (fs.existsSync(dir)) {
      fs.readdirSync(dir, { withFileTypes: true }).forEach(d => {
        if (d.isDirectory()) scan(path.join(dir, d.name), type);
      });
    }
  }
  const libs = path.join(root, 'libs');
  if (fs.existsSync(libs)) fs.readdirSync(libs).forEach(d => scan(path.join(libs, d), 'lib'));
  const services = path.join(root, 'services');
  if (fs.existsSync(services)) fs.readdirSync(services).forEach(d => scan(path.join(services, d), 'service'));
  const apps = path.join(root, 'apps');
  if (fs.existsSync(apps)) fs.readdirSync(apps).forEach(d => scan(path.join(apps, d), 'app'));
  return result;
}

function filterPackages(pkgs, names) {
  if (!names.length) return pkgs;
  const map = new Map(pkgs.map(p => [p.name, p]));
  return names.map(n => map.get(n)).filter(Boolean);
}

function runNpm(pkg, args) {
  console.log(`[${pkg.name}] npm ${args}`);
  try {
    execSync(`npm ${args}`, { stdio: 'inherit', cwd: pkg.path, shell: process.platform === 'win32' });
  } catch (err) {
    process.exitCode = err.status || 1;
  }
}

function usage() {
  console.log(`Usage: node repo.js <command> [names...]
Commands:
  install <service...>       npm install in services
  start <service...>         npm run start in services
  start:dev <service...>     npm run start:dev in services
  lint <service...>          npm run lint in services
  build-libs <lib...>        npm run build in libs
  test <service...>          npm run test in services
  clone-configs [names...]   copy shared ESLint config to packages
  list [names...]            list packages (all types)
  clone-configs [names...]   copy root .prettierrc into packages
  run <script> [names...]    run arbitrary npm script in packages
Examples:
  node repo.js install
  node repo.js start:dev vy-person-identity
  node repo.js build-libs ez-logger ez-utils
  node repo.js list
  node repo.js run build vy-person-identity
`);
}

const all = collectPackages(__dirname);
const services = all.filter(p => p.type === 'service');
const libs = all.filter(p => p.type === 'lib');
const apps = all.filter(p => p.type === 'app');

const [,,cmd, ...args] = process.argv;

switch (cmd) {
  case 'install':
    filterPackages(services, args).forEach(p => runNpm(p, 'install'));
    break;
  case 'start':
  case 'start:dev':
    filterPackages(services, args).forEach(p => runNpm(p, `run ${cmd}`));
    break;
  case 'lint':
    filterPackages(services, args).forEach(p => runNpm(p, 'run lint'));
    break;
  case 'build-libs':
    filterPackages(libs, args).forEach(p => runNpm(p, 'run build'));
    break;
  case 'test':
    filterPackages(services, args).forEach(p => runNpm(p, 'run test'));
    break;
  case 'clone-configs': {
    const src = path.join(__dirname, '.eslintrc.cjs');
    filterPackages([...services, ...apps], args).forEach(p => {
      fs.copyFileSync(src, path.join(p.path, '.eslintrc.js'));
      console.log(`[${p.name}] copied .eslintrc.js`);
    });
    break;
  }
  case 'list':
    filterPackages(all, args).forEach(p => {
      console.log(`${p.type}\t${p.name}\t${p.path}`);
    });
    break;
  case 'clone-configs':
    const src = path.join(__dirname, '.prettierrc');
    if (!fs.existsSync(src)) {
      console.error('Root .prettierrc not found');
      break;
    }
    filterPackages(all, args).forEach(p => {
      const dest = path.join(p.path, '.prettierrc');
      fs.copyFileSync(src, dest);
      console.log(`Copied .prettierrc to ${p.name}`);
    });
    break;
  case 'run':
    const script = args.shift();
    if (!script) {
      usage();
      break;
    }
    filterPackages(all, args).forEach(p => runNpm(p, `run ${script}`));
    break;
  default:
    usage();
}
