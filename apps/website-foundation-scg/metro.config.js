const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const { FileStore } = require("metro-cache");
const path = require("path");

const projectRoot = __dirname;
const config = getDefaultConfig(projectRoot);

// Use a stable cache directory inside the project to avoid Windows
// temporary directory cleanup issues (ENOTEMPTY on rmdir)
const cacheDir = path.join(projectRoot, "node_modules", ".cache", "metro");
config.cacheStores = [new FileStore({ root: cacheDir })];

// Restrict file watching to this workspace to avoid permission errors on some systems
config.watchFolders = [projectRoot];

// Change Metro server port to avoid conflicts with the default 8081
config.server = {
  ...config.server,
  port: Number(process.env.RCT_METRO_PORT) || 8083,
};

module.exports = withNativeWind(config, { input: "./global.css" });
