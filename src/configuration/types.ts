import { LoggingMiddleware } from "../middleware/types"

export type AnyFunction = (...args: unknown[]) => void

export interface RobBotConfiguration {
  middleware: {
    messages: LoggingMiddleware[]
    logging: AnyFunction
    storage: AnyFunction
  }
}
