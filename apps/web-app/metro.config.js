const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Change Metro server port to avoid conflicts with the default 8081
config.server = {
  ...config.server,
  port: Number(process.env.RCT_METRO_PORT) || 8082,
};

module.exports = withNativeWind(config, { input: "./global.css" });
