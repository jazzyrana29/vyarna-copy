"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLoggerConfig = void 0;
const ez_logger_1 = require("ez-logger");
const getLoggerConfig = (profile) => new ez_logger_1.EzLogger(parseInt(process.env.LOG_STREAM_LEVEL) || ez_logger_1.LogStreamLevel.ProdStandard, process.env.CONTEXT || "ez-utils", profile);
exports.getLoggerConfig = getLoggerConfig;
//# sourceMappingURL=config.js.map