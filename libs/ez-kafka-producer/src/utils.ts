import { EzLogger, LogStreamLevel } from 'ez-logger';

export const getLoggerConfig = (profile: string): EzLogger =>
  new EzLogger(
    parseInt(process.env.LOG_STREAM_LEVEL) || LogStreamLevel.ProdStandard,
    process.env.CONTEXT || 'ez-kafka-producer',
    profile,
  );

export const sleep = (timeout: number): Promise<void> =>
  new Promise<void>((resolve) => setTimeout(resolve, timeout));
