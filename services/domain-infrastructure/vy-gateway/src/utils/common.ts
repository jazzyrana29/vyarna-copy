import { EzLogger } from 'ez-logger';

export const getLoggerConfig = (profile: string) =>
  new EzLogger(
    // parse LOG_STREAM_LEVEL or default to 1
    parseInt(process.env.LOG_STREAM_LEVEL ?? '1', 10),
    // use CONTEXT or default to service name
    process.env.CONTEXT ?? 'vy-gateway',
    profile,
  );

export const CORS_ALLOW = {
  origin: (origin, callback) => {
    if (!origin || process.env.ALLOWED_ORIGINS.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};
