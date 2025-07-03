"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogStreamLevel = exports.LogLevel = void 0;
var LogLevel;
(function (LogLevel) {
    LogLevel["Emergency"] = "emergency";
    LogLevel["Fatal"] = "fatal";
    LogLevel["Error"] = "error";
    LogLevel["Warn"] = "warn";
    LogLevel["Info"] = "info";
    LogLevel["Debug"] = "debug";
})(LogLevel || (exports.LogLevel = LogLevel = {}));
var LogStreamLevel;
(function (LogStreamLevel) {
    LogStreamLevel[LogStreamLevel["None"] = -1] = "None";
    LogStreamLevel[LogStreamLevel["ProdStandard"] = 1] = "ProdStandard";
    LogStreamLevel[LogStreamLevel["DebugLight"] = 3] = "DebugLight";
    LogStreamLevel[LogStreamLevel["DebugMedium"] = 10] = "DebugMedium";
    LogStreamLevel[LogStreamLevel["DebugHeavy"] = 101] = "DebugHeavy";
    LogStreamLevel[LogStreamLevel["DebugSuperHeavy"] = 1001] = "DebugSuperHeavy";
    LogStreamLevel[LogStreamLevel["DebugEverything"] = 99999] = "DebugEverything";
})(LogStreamLevel || (exports.LogStreamLevel = LogStreamLevel = {}));
//# sourceMappingURL=ez.logger.enum.js.map