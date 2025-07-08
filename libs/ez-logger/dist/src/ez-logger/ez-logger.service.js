"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var EzLogger_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EzLogger = void 0;
const clc = require("cli-color");
const common_1 = require("@nestjs/common");
const isObject = (arg) => arg !== null && typeof arg === 'object';
const ez_logger_enum_1 = require("./ez.logger.enum");
const yellow = clc.xterm(3);
let EzLogger = EzLogger_1 = class EzLogger {
    constructor(appStreamLevel, appContext, context, isTimestampEnabled = true) {
        this.appStreamLevel = appStreamLevel;
        this.context = context;
        this.isTimestampEnabled = isTimestampEnabled;
        EzLogger_1.appContext = appContext;
    }
    static info(message, context = '', isTimeDiffEnabled = true, traceId) {
        this.printMessage(ez_logger_enum_1.LogLevel.Info, message, clc.green, context, isTimeDiffEnabled, traceId);
    }
    static error(message, context = '', isTimeDiffEnabled = true, traceId) {
        this.printMessage(ez_logger_enum_1.LogLevel.Error, message, clc.red, context, isTimeDiffEnabled, traceId);
    }
    static warn(message, context = '', isTimeDiffEnabled = true, traceId) {
        this.printMessage(ez_logger_enum_1.LogLevel.Warn, message, clc.yellow, context, isTimeDiffEnabled, traceId);
    }
    static debug(message, context = '', isTimeDiffEnabled = true, traceId) {
        this.printMessage(ez_logger_enum_1.LogLevel.Debug, message, clc.magentaBright, context, isTimeDiffEnabled, traceId);
    }
    static fatal(message, context = '', isTimeDiffEnabled = true, traceId) {
        this.printMessage(ez_logger_enum_1.LogLevel.Fatal, message, clc.cyanBright, context, isTimeDiffEnabled, traceId);
    }
    static emergency(message, context = '', isTimeDiffEnabled = true, traceId) {
        this.printMessage(ez_logger_enum_1.LogLevel.Fatal, message, clc.xterm(202), context, isTimeDiffEnabled, traceId);
    }
    static printMessage(name, message, color, context = '', isTimeDiffEnabled, traceId) {
        const output = isObject(message)
            ? `${color('Object:')}\n${JSON.stringify(message, null, 2)}\n`
            : color(message);
        const localeStringOptions = {
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            day: '2-digit',
            month: '2-digit',
        };
        const ctx = this.prefix || this.appContext;
        const timestamp = new Date(Date.now()).toLocaleString(undefined, localeStringOptions);
        process.stdout.write(color(`${ctx ? `[${ctx}]` : ``} [${name.toUpperCase()}] ${process.pid} - `));
        process.stdout.write(`${timestamp}  `);
        context && process.stdout.write(yellow(`[${context}] `));
        process.stdout.write(`${traceId ? `traceId: ${color(traceId)}  ` : ``}`);
        process.stdout.write(output ? `message: ${output}` : '');
        process.stdout.write(`\n`);
    }
    error(message, traceId, profile, logStreamLevel) {
        if (this.validStreamLevel(logStreamLevel))
            this.callFunction(ez_logger_enum_1.LogLevel.Error, message, profile, traceId);
    }
    info(message, traceId, profile, logStreamLevel) {
        if (this.validStreamLevel(logStreamLevel))
            this.callFunction(ez_logger_enum_1.LogLevel.Info, message, profile, traceId);
    }
    warn(message, traceId, profile, logStreamLevel) {
        if (this.validStreamLevel(logStreamLevel))
            this.callFunction(ez_logger_enum_1.LogLevel.Warn, message, profile, traceId);
    }
    debug(message, traceId, profile, logStreamLevel) {
        if (this.validStreamLevel(logStreamLevel))
            this.callFunction(ez_logger_enum_1.LogLevel.Debug, message, profile, traceId);
    }
    fatal(message, traceId, profile, logStreamLevel) {
        if (this.validStreamLevel(logStreamLevel))
            this.callFunction(ez_logger_enum_1.LogLevel.Fatal, message, profile, traceId);
    }
    emergency(message, traceId, profile, logStreamLevel) {
        if (this.validStreamLevel(logStreamLevel))
            this.callFunction(ez_logger_enum_1.LogLevel.Emergency, message, profile, traceId);
    }
    log(message, traceId, profile, logStreamLevel) {
        if (this.validStreamLevel(logStreamLevel))
            this.callFunction(ez_logger_enum_1.LogLevel.Info, message, profile, traceId);
    }
    callFunction(logLevel, message, profile, traceId) {
        if (!this.isLogLevelEnabled(logLevel)) {
            return;
        }
        const instance = this.getInstance();
        const func = instance && instance[logLevel];
        func &&
            func.call(instance, message, profile ? `${this.context} -> ${profile}` : this.context, this.isTimestampEnabled, traceId);
    }
    getInstance() {
        const { instance } = EzLogger_1;
        return instance === this ? EzLogger_1 : instance;
    }
    isLogLevelEnabled(level) {
        return Object.values(ez_logger_enum_1.LogLevel).includes(level);
    }
    validStreamLevel(streamLevel) {
        if (!Boolean(streamLevel))
            return true;
        return streamLevel <= this.appStreamLevel;
    }
};
exports.EzLogger = EzLogger;
EzLogger.instance = EzLogger_1;
exports.EzLogger = EzLogger = EzLogger_1 = __decorate([
    __param(2, (0, common_1.Optional)()),
    __param(3, (0, common_1.Optional)()),
    __metadata("design:paramtypes", [Number, String, String, Object])
], EzLogger);
//# sourceMappingURL=ez-logger.service.js.map