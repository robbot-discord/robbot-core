import { RobBotLogger } from "../logging/types"
export interface LoggingMiddleware {
  (logger: RobBotLogger): RobBotLogger
}
