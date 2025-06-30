import * as clc from 'cli-color';
import {LoggerService, Optional} from '@nestjs/common';
import {isObject} from 'util';
import {LogLevel, LogStreamLevel} from './ez.logger.enum';

declare const process: any;
const yellow = clc.xterm(3);

export class EzLogger implements LoggerService {
  private static lastTimestamp?: number;
  private static instance?: typeof EzLogger | LoggerService = EzLogger;
  private static prefix: string;
  private static appContext: string;

  constructor(
    private readonly appStreamLevel: LogStreamLevel,
    appContext: string,
    @Optional() private readonly context?: string,
    @Optional() private readonly isTimestampEnabled = true,
  ) {
    EzLogger.appContext = appContext;
  }

  static info(
    message: any,
    context = '',
    isTimeDiffEnabled = true,
    traceId: string,
  ) {
    this.printMessage(
      LogLevel.Info,
      message,
      clc.green,
      context,
      isTimeDiffEnabled,
      traceId,
    );
  }

  static error(
    message: any,
    context = '',
    isTimeDiffEnabled = true,
    traceId: string,
  ) {
    this.printMessage(
      LogLevel.Error,
      message,
      clc.red,
      context,
      isTimeDiffEnabled,
      traceId,
    );
  }

  static warn(
    message: any,
    context = '',
    isTimeDiffEnabled = true,
    traceId: string,
  ) {
    this.printMessage(
      LogLevel.Warn,
      message,
      clc.yellow,
      context,
      isTimeDiffEnabled,
      traceId,
    );
  }

  static debug(
    message: any,
    context = '',
    isTimeDiffEnabled = true,
    traceId: string,
  ) {
    this.printMessage(
      LogLevel.Debug,
      message,
      clc.magentaBright,
      context,
      isTimeDiffEnabled,
      traceId,
    );
  }

  static fatal(
    message: any,
    context = '',
    isTimeDiffEnabled = true,
    traceId: string,
  ) {
    this.printMessage(
      LogLevel.Fatal,
      message,
      clc.cyanBright,
      context,
      isTimeDiffEnabled,
      traceId,
    );
  }

  static emergency(
    message: any,
    context = '',
    isTimeDiffEnabled = true,
    traceId: string,
  ) {
    this.printMessage(
      LogLevel.Fatal,
      message,
      clc.xterm(202),
      context,
      isTimeDiffEnabled,
      traceId,
    );
  }

  private static printMessage(
    name: LogLevel,
    message: any,
    color: (message: string) => string,
    context: string = '',
    isTimeDiffEnabled: boolean,
    traceId: string,
  ) {
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
    const timestamp = new Date(Date.now()).toLocaleString(
      undefined,
      localeStringOptions as any,
    );
    process.stdout.write(
      color(
        `${ctx ? `[${ctx}]` : ``} [${name.toUpperCase()}] ${process.pid} - `,
      ),
    );
    process.stdout.write(`${timestamp}  `);
    context && process.stdout.write(yellow(`[${context}] `));
    process.stdout.write(`${traceId ? `traceId: ${color(traceId)}  ` : ``}`);

    process.stdout.write(output ? `message: ${output}` : '');

    process.stdout.write(`\n`);
  }

  error(
    message: any,
    traceId: string,
    profile: string,
    logStreamLevel: LogStreamLevel,
  ) {
    if (this.validStreamLevel(logStreamLevel))
      this.callFunction(LogLevel.Error, message, profile, traceId);
  }

  info(
    message: any,
    traceId: string,
    profile: string,
    logStreamLevel: LogStreamLevel,
  ) {
    if (this.validStreamLevel(logStreamLevel))
      this.callFunction(LogLevel.Info, message, profile, traceId);
  }

  warn(
    message: any,
    traceId: string,
    profile: string,
    logStreamLevel: LogStreamLevel,
  ) {
    if (this.validStreamLevel(logStreamLevel))
      this.callFunction(LogLevel.Warn, message, profile, traceId);
  }

  debug(
    message: any,
    traceId: string,
    profile: string,
    logStreamLevel: LogStreamLevel,
  ) {
    if (this.validStreamLevel(logStreamLevel))
      this.callFunction(LogLevel.Debug, message, profile, traceId);
  }

  fatal(
    message: any,
    traceId: string,
    profile: string,
    logStreamLevel: LogStreamLevel,
  ) {
    if (this.validStreamLevel(logStreamLevel))
      this.callFunction(LogLevel.Fatal, message, profile, traceId);
  }

  emergency(
    message: any,
    traceId: string,
    profile: string,
    logStreamLevel: LogStreamLevel,
  ) {
    if (this.validStreamLevel(logStreamLevel))
      this.callFunction(LogLevel.Emergency, message, profile, traceId);
  }

  log(
    message: any,
    traceId: string,
    profile: string,
    logStreamLevel: LogStreamLevel,
  ): any {
    if (this.validStreamLevel(logStreamLevel))
      this.callFunction(LogLevel.Info, message, profile, traceId);
  }

  private callFunction(
    logLevel: LogLevel,
    message: any,
    profile: string,
    traceId: string,
  ) {
    if (!this.isLogLevelEnabled(logLevel)) {
      return;
    }
    const instance = this.getInstance();
    const func = instance && (instance as typeof EzLogger)[logLevel];
    // tslint:disable-next-line: no-unused-expression
    func &&
    func.call(
      instance,
      message,
      profile ? `${this.context} -> ${profile}` : this.context,
      this.isTimestampEnabled,
      traceId,
    );
  }

  private getInstance(): typeof EzLogger | LoggerService {
    const {instance} = EzLogger;
    return instance === this ? EzLogger : instance;
  }

  private isLogLevelEnabled(level: LogLevel): boolean {
    return Object.values(LogLevel).includes(level);
  }

  private validStreamLevel(streamLevel: LogStreamLevel): boolean {
    if (!Boolean(streamLevel)) return true;
    return streamLevel <= this.appStreamLevel;
  }
}
