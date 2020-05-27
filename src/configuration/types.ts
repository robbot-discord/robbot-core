import { LoggingMiddleware } from "../middleware/types"
import { ClientOptions } from "discord.js"
import { RobBotLogger } from "../logging/types"
import { EventHandlers } from "../handlers"

export type AnyFunction = (...args: unknown[]) => void

export interface RobBotConfiguration {
  discord: {
    apiToken: string
    clientOptions?: ClientOptions
  }
  eventHandlers: EventHandlers
  middleware?: {
    messages?: AnyFunction
    logging?: LoggingMiddleware[]
    storage?: AnyFunction
  }
  logger: RobBotLogger
}
