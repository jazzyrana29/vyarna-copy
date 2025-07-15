#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const { execSync, spawn } = require("child_process");

function parseEnv(content) {
  const env = {};
  content.split(/\r?\n/).forEach((line) => {
    const m = line.match(/^\s*([^#=\s]+)\s*=(.*)$/);
    if (m) env[m[1]] = m[2].trim();
  });
  return env;
}

function adaptCaPath(servicePath, rootPath, caPath) {
  if (!caPath) return caPath;
  const abs = path.resolve(rootPath, caPath);
  let rel = path.relative(servicePath, abs);
  if (!rel.startsWith(".")) rel = "./" + rel;
  return rel.split(path.sep).join("/");
}

function collectPackages(root) {
  const result = [];

  function scan(dir, type) {
    const base = path.basename(dir);
    if (base === "node_modules" || base === "dist") return;
    const pkg = path.join(dir, "package.json");
    if (fs.existsSync(pkg)) {
      const data = JSON.parse(fs.readFileSync(pkg, "utf8"));
      result.push({ path: dir, type, name: data.name || path.basename(dir) });
    } else if (fs.existsSync(dir)) {
      fs.readdirSync(dir, { withFileTypes: true }).forEach((d) => {
        if (d.isDirectory()) scan(path.join(dir, d.name), type);
      });
    }
  }

  const libs = path.join(root, "libs");
  if (fs.existsSync(libs))
    fs.readdirSync(libs).forEach((d) => scan(path.join(libs, d), "lib"));
  const services = path.join(root, "services");
  if (fs.existsSync(services))
    fs.readdirSync(services).forEach((d) =>
      scan(path.join(services, d), "service"),
    );
  const apps = path.join(root, "apps");
  if (fs.existsSync(apps))
    fs.readdirSync(apps).forEach((d) => scan(path.join(apps, d), "app"));
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
      stdio: "inherit",
      cwd: pkg.path,
      shell: process.platform === "win32",
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
  const opts = { cwd, detached: true, stdio: "ignore" };
  if (platform === "win32") {
    spawn("cmd", ["/c", "start", "cmd", "/k", command], opts).unref();
  } else if (platform === "darwin") {
    const script = `tell application "Terminal" to do script "cd ${cwd.replace(/"/g, '\\"')} && ${command}"`;
    spawn("osascript", ["-e", script], opts).unref();
  } else {
    const term = process.env.TERM_PROGRAM || "x-terminal-emulator";
    spawn(
      term,
      ["-e", `bash -c 'cd "${cwd}" && ${command}; exec bash'`],
      opts,
    ).unref();
  }
}

function runStripe(args) {
  const globalPath = path.join(__dirname, "global.env.local");
  if (!fs.existsSync(globalPath)) {
    console.log(
      "global.env.local not found. Create it from global.env.local-example first.",
    );
    return;
  }

  const env = parseEnv(fs.readFileSync(globalPath, "utf8"));
  const apiKey = env.STRIPE_SECRET_KEY;
  if (!apiKey) {
    console.log("STRIPE_SECRET_KEY is missing in global.env.local.");
    return;
  }

  // Detect Docker CLI
  const dockerCmd = process.platform === "win32" ? "docker.exe" : "docker";

  // Prepare network flags depending on platform
  const networkArgs = [];
  networkArgs.push("--network", "host");

  // If using `stripe listen`, adjust --forward-to URL on non-Linux platforms
  if (args[0] === "listen") {
    const idx = args.findIndex((a) => a === "--forward-to");
    if (
      idx !== -1 &&
      args[idx + 1] &&
      args[idx + 1].includes("localhost") &&
      process.platform !== "linux"
    ) {
      args[idx + 1] = args[idx + 1].replace(
        "localhost",
        "host.docker.internal",
      );
    }
  }

  // Build docker command
  const dockerArgs = [
    "run",
    "--rm",
    ...networkArgs,
    "-e",
    `STRIPE_API_KEY=${apiKey}`,
    "stripe/stripe-cli",
    ...args,
  ];

  const proc = spawn(dockerCmd, dockerArgs, { stdio: "inherit" });
  proc.on("exit", (code) => process.exit(code));
}

function ensureLibsBuilt(libraries) {
  libraries.forEach((pkg) => {
    const nm = path.join(pkg.path, "node_modules");
    const dist = path.join(pkg.path, "dist");
    if (!fs.existsSync(nm)) {
      console.log(
        `[${pkg.type}] ${pkg.name} missing node_modules, running install`,
      );
      runNpm(pkg, "install", true);
    }
    if (!fs.existsSync(dist)) {
      console.log(`[${pkg.type}] ${pkg.name} missing dist, running build`);
      runNpm(pkg, "run build", true);
    }
  });
}

function ensureDepsInstalled(packages) {
  packages.forEach((pkg) => {
    const nm = path.join(pkg.path, "node_modules");
    if (!fs.existsSync(nm)) {
      if (pkg.type === "app") {
        console.log(
          `[${pkg.type}] ${pkg.name} installing dependencies (--legacy-peer-deps)`,
        );
        runNpm(pkg, "install --legacy-peer-deps", true);
      } else if (pkg.type === "service") {
        console.log(`[${pkg.type}] ${pkg.name} installing dependencies`);
        runNpm(pkg, "install", true);
      }
    }
  });
}

function cleanInstallPackages(packages) {
  packages.forEach((pkg) => {
    const nm = path.join(pkg.path, "node_modules");
    const dist = path.join(pkg.path, "dist");
    fs.rmSync(nm, { recursive: true, force: true });
    fs.rmSync(dist, { recursive: true, force: true });
  });
}

function startPackages(packages) {
  if (!packages.length) return;
  packages.forEach((pkg) => {
    const script = pkg.type === "service" ? "start:dev" : "start";
    console.log(`[${pkg.type}] ${pkg.name} > npm run ${script}`);
    openTerminal(pkg.path, `npm run ${script}`);
  });
}

function usage() {
  console.log(`Usage: node repo.js <command> [names...]
Commands:
  install [names...]        install packages (apps use --legacy-peer-deps)
  clean-install [names...]  remove dist & node_modules directories
  start <names...>           run apps (npm start) or services (npm start:dev)
                             each launches in its own terminal window
                             use "node repo.js list" to view package names
  lint [names...]            npm run lint in apps and services
  lint:fix [names...]        npm run lint:fix in apps and services
  prettier:check [names...]  npm run prettier:check in apps and services
  prettier:fix [names...]    npm run prettier:fix in apps and services
  build-libs <lib...>        npm run build in libs
  test <service...>          npm run test in services
  fill-env                   generate .env files for services
  list [names...]            list packages (all types)
  run <script> [names...]    run arbitrary npm script in packages
  update-libs <lib...> [--in name]   rebuild libs and reinstall them in packages
  stripe <args...>           run Stripe CLI using STRIPE_SECRET_KEY
node repo.js install
  node repo.js clean-install
  node repo.js start Vyarna website-foundation-scg vy-person-identity
  node repo.js build-libs ez-logger ez-utils
  node repo.js list
  node repo.js fill-env
  node repo.js run build vy-person-identity
  node repo.js stripe customers list
`);
}

const all = collectPackages(__dirname);
const services = all.filter((p) => p.type === "service");
const libs = all.filter((p) => p.type === "lib");
const apps = all.filter((p) => p.type === "app");
const lintTargets = [...apps, ...services];

const [, , cmd, ...args] = process.argv;

switch (cmd) {
  case "install": {
    function doInstall(targetPkgs) {
      targetPkgs.forEach((pkg) => {
        if (pkg.type === "app") {
          // use legacy peer deps for apps to satisfy React Native requirements
          runNpm(pkg, "install --legacy-peer-deps", true);
        } else if (pkg.type === "service" || pkg.type === "lib") {
          runNpm(pkg, "install", true);
          if (pkg.type === "lib") {
            // automatically build libraries after installing
            runNpm(pkg, "run build", true);
          }
        }
      });
    }

    if (args.length === 0) {
      doInstall(all);
    } else {
      const selected = filterPackages(all, args);
      doInstall(selected);
    }
    break;
  }
  case "clean-install": {
    const target = args.length === 0 ? all : filterPackages(all, args);
    cleanInstallPackages(target);
    break;
  }
  case "start": {
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

    console.log("Checking libraries before starting...");
    ensureLibsBuilt(libs);

    const targets = filterPackages(
      all.filter((p) => p.type === "service" || p.type === "app"),
      args,
    );

    console.log("Ensuring dependencies for selected packages...");
    ensureDepsInstalled(targets);

    startPackages(targets);
    break;
  }
  case "lint":
    filterPackages(lintTargets, args).forEach((p) => runNpm(p, "run lint"));
    break;
  case "lint:fix":
    filterPackages(lintTargets, args).forEach((p) => runNpm(p, "run lint:fix"));
    break;
  case "prettier:check":
    filterPackages(lintTargets, args).forEach((p) =>
      runNpm(p, "run prettier:check"),
    );
    break;
  case "prettier:fix":
    filterPackages(lintTargets, args).forEach((p) =>
      runNpm(p, "run prettier:fix"),
    );
    break;
  case "build-libs":
    filterPackages(libs, args).forEach((p) => runNpm(p, "run build"));
    break;
  case "test":
    filterPackages(services, args).forEach((p) => runNpm(p, "run test"));
    break;
  case "fill-env": {
    const globalPath = path.join(__dirname, "global.env.local");
    if (!fs.existsSync(globalPath)) {
      console.log(
        "global.env.local not found. Create it from global.env.local-example first.",
      );
      break;
    }
    const globalEnv = parseEnv(fs.readFileSync(globalPath, "utf8"));
    services.forEach((pkg) => {
      const examplePath = path.join(pkg.path, ".env-example");
      if (!fs.existsSync(examplePath)) return;
      const exampleEnv = parseEnv(fs.readFileSync(examplePath, "utf8"));
      const keys = Object.keys(exampleEnv);
      if (!keys.length) return;
      const envPath = path.join(pkg.path, ".env");
      let envLines = [];
      let envVars = {};
      if (fs.existsSync(envPath)) {
        const cnt = fs.readFileSync(envPath, "utf8");
        envLines = cnt.split(/\r?\n/);
        envVars = parseEnv(cnt);
      }
      let changed = false;
      keys.forEach((key) => {
        if (envVars[key]) return;
        let value;
        if (key === "TIDB_CA_PATH") {
          if (globalEnv[key]) {
            value = adaptCaPath(pkg.path, __dirname, globalEnv[key]);
          } else {
            value = exampleEnv[key];
          }
        } else if (key in globalEnv) {
          value = globalEnv[key];
        } else {
          value = exampleEnv[key];
        }
        if (value !== undefined) {
          envLines.push(`${key}=${value}`);
          envVars[key] = value;
          changed = true;
        }
      });
      if (changed) {
        fs.writeFileSync(envPath, envLines.join("\n"));
        console.log(`[service] ${pkg.name} wrote ${envPath}`);
      }
    });
    break;
  }
  case "list":
    filterPackages(all, args).forEach((p) => {
      console.log(`${p.type}\t${p.name}\t${p.path}`);
    });
    break;
  case "stripe":
    if (!args.length) {
      usage();
      break;
    }
    runStripe(args);
    break;
  case "update-libs": {
    const inIndex = args.indexOf("--in");
    const libNames = inIndex === -1 ? args : args.slice(0, inIndex);
    const targetName = inIndex !== -1 ? args[inIndex + 1] : undefined;

    const namesToUpdate = libNames.length
      ? libNames
      : libs.map((l) => l.name);

    namesToUpdate.forEach((libName) => {
      const libPkg = libs.find((l) => l.name === libName);
      if (!libPkg) {
        console.log(`Library ${libName} not found`);
        return;
      }

      let targets = [...libs, ...services, ...apps].filter(
        (p) => p.name !== libName,
      );
      if (targetName) {
        targets = filterPackages(targets, [targetName]);
      }

      runNpm(libPkg, "run build", true);

      function hasDep(pkgPath) {
        const pkgJson = JSON.parse(
          fs.readFileSync(path.join(pkgPath, "package.json"), "utf8"),
        );
        return (
          (pkgJson.dependencies && pkgJson.dependencies[libName]) ||
          (pkgJson.devDependencies && pkgJson.devDependencies[libName]) ||
          (pkgJson.peerDependencies && pkgJson.peerDependencies[libName])
        );
      }

      targets.forEach((pkg) => {
        if (!hasDep(pkg.path)) return;
        const modPath = path.join(pkg.path, "node_modules", libName);
        console.log(`[${pkg.type}] ${pkg.name} removing ${libName}`);
        fs.rmSync(modPath, { recursive: true, force: true });
        const cmd =
          pkg.type === "app"
            ? `install ${libName} --legacy-peer-deps`
            : `install ${libName}`;
        runNpm(pkg, cmd, true);
      });
    });
    break;
  }
  case "run":
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
