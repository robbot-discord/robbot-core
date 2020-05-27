import { LoggingMiddleware } from "../types"
import { RobBotConfiguration } from "../../configuration/types"
import { LogLevelFilterConfiguration } from "./types"
import { LogLevel, RobBotLogger } from "../../logging/types"

export const createLoggingLevelFilter = (
  configuration: RobBotConfiguration & LogLevelFilterConfiguration
): LoggingMiddleware => {
  return (logger: RobBotLogger): RobBotLogger => {
    const { logLevel } = configuration

    const { ERROR, WARN, INFO, DEBUG, TRACE } = LogLevel
    const noOp = () => {
      return
    }

    const wrappedLogger: RobBotLogger = {
      error: logLevel >= ERROR ? (message) => logger.error(message) : noOp,
      warn: logLevel >= WARN ? (message) => logger.warn(message) : noOp,
      info: logLevel >= INFO ? (message) => logger.info(message) : noOp,
      debug: logLevel >= DEBUG ? (message) => logger.debug(message) : noOp,
      trace: logLevel >= TRACE ? (message) => logger.trace(message) : noOp,
    }

    return wrappedLogger
  }
}
