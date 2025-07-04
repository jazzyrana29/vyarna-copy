const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const path = require("path");

const projectRoot = __dirname;
const config = getDefaultConfig(projectRoot);

// Restrict file watching to this workspace to avoid permission errors on some systems
config.watchFolders = [projectRoot];

// Change Metro server port to avoid conflicts with the default 8081
config.server = {
  ...config.server,
  port: Number(process.env.RCT_METRO_PORT) || 8083,
};

module.exports = withNativeWind(config, { input: "./global.css" });
