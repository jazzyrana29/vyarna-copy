import { EzLogger } from 'ez-logger';

export const getLoggerConfig = (profile: string): EzLogger =>
  new EzLogger(
    parseInt(process.env.LOG_STREAM_LEVEL),
    process.env.CONTEXT,
    profile,
  );
