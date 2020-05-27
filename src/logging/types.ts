export type LogMessage = string | Error

export type LogHandler = (message: LogMessage) => void

/**
 * Lower is more critical, high is less critical.
 *
 * i.e. 'trace' is lowest, 'error' is highest
 */
export enum LogLevel {
  ERROR = "error",
  WARN = "warn",
  INFO = "info",
  DEBUG = "debug",
  TRACE = "trace",
}

export type RobBotLogger = Record<LogLevel, LogHandler>
