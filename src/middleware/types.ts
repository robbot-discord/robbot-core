import { RobBotLogger } from "../logging/types"

export interface RobBotLoggerDispatch {
  (logger: RobBotLogger): RobBotLogger
}

export interface LoggingMiddleware {
  (logger: RobBotLogger, next: RobBotLoggerDispatch): RobBotLogger
}
