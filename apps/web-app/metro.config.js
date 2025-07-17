const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const path = require("path");

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, "../..");
const config = getDefaultConfig(projectRoot);

// Allow Metro to resolve packages from the monorepo libs directory
config.watchFolders = [projectRoot, path.join(workspaceRoot, "libs")];

// Change Metro server port to avoid conflicts with the default 8081
config.server = {
  ...config.server,
  port: Number(process.env.RCT_METRO_PORT) || 8083,
};

module.exports = withNativeWind(config, { input: "./global.css" });
