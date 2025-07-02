export enum LogLevel {
  Emergency = 'emergency',
  Fatal = 'fatal',
  Error = 'error',
  Warn = 'warn',
  Info = 'info',
  Debug = 'debug',
}

export enum LogStreamLevel {
  None = -1,
  ProdStandard = 1,
  DebugLight = 3,
  DebugMedium = 10,
  DebugHeavy = 101,
  DebugSuperHeavy = 1001,
  DebugEverything = 99999,
}
