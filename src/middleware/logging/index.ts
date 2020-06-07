import { LoggingMiddleware } from "../types"
import { LogLevelFilterConfiguration } from "./types"
import { LogLevel, Logger, LogLevelToNumber } from "../../logging/types"

export const createLoggingLevelFilter = (
  configuration: LogLevelFilterConfiguration
): LoggingMiddleware => {
  return (logger: Logger): Logger => {
    const { logLevel } = configuration
    const logLevelNum = LogLevelToNumber[logLevel]

    const { ERROR, WARN, INFO, DEBUG, TRACE } = LogLevel
    const noOp = () => {
      return
    }

    const wrappedLogger: Logger = {
      error:
        logLevelNum >= LogLevelToNumber[ERROR]
          ? (message) => logger.error(message)
          : noOp,
      warn:
        logLevelNum >= LogLevelToNumber[WARN]
          ? (message) => logger.warn(message)
          : noOp,
      info:
        logLevelNum >= LogLevelToNumber[INFO]
          ? (message) => logger.info(message)
          : noOp,
      debug:
        logLevelNum >= LogLevelToNumber[DEBUG]
          ? (message) => logger.debug(message)
          : noOp,
      trace:
        logLevelNum >= LogLevelToNumber[TRACE]
          ? (message) => logger.trace(message)
          : noOp,
    }

    return wrappedLogger
  }
}

export * from "./types"
