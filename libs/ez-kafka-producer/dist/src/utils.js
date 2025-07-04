"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleep = exports.getLoggerConfig = void 0;
const ez_logger_1 = require("ez-logger");
const getLoggerConfig = (profile) => new ez_logger_1.EzLogger(parseInt(process.env.LOG_STREAM_LEVEL) || ez_logger_1.LogStreamLevel.ProdStandard, process.env.CONTEXT || 'ez-kafka-producer', profile);
exports.getLoggerConfig = getLoggerConfig;
const sleep = (timeout) => new Promise((resolve) => setTimeout(resolve, timeout));
exports.sleep = sleep;
//# sourceMappingURL=utils.js.map