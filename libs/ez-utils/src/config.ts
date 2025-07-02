import { EzLogger, LogStreamLevel } from "ez-logger";

export const getLoggerConfig = (profile: string): EzLogger =>
  new EzLogger(
    parseInt(process.env.LOG_STREAM_LEVEL) || LogStreamLevel.ProdStandard,
    process.env.CONTEXT || "ez-utils",
    profile,
  );
