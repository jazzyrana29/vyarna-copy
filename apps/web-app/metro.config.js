const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const exclusionList = require("metro-config/src/defaults/exclusionList");
const path = require("path");

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, "../..");
const config = getDefaultConfig(projectRoot);

// Allow Metro to resolve packages from the monorepo libs directory
config.watchFolders = [projectRoot, path.join(workspaceRoot, "libs")];
// Exclude nested node_modules from libraries
config.resolver = {
  ...config.resolver,
  blockList: exclusionList([/\/libs\/.*\/node_modules\/.*$/]),
};

// Change Metro server port to avoid conflicts with the default 8081
config.server = {
  ...config.server,
  port: Number(process.env.RCT_METRO_PORT) || 8083,
};

module.exports = withNativeWind(config, { input: "./global.css" });
