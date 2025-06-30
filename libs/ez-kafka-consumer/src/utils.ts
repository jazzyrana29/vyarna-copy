import { EzLogger, LogStreamLevel } from "ez-logger";

export const getLoggerConfig = (profile: string) =>
  new EzLogger(
    parseInt(process.env.LOG_STREAM_LEVEL) || LogStreamLevel.ProdStandard,
    process.env.CONTEXT || "ez-kafka-consumer",
    profile,
  );

export const sleep = (timeout: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, timeout));
