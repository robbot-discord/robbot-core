import { LoggingMiddleware } from "../middleware/types"
import { ClientOptions } from "discord.js"
import { RobBotLogger } from "../logging/types"
import { EventHandlers } from "../handlers"

export type AnyFunction = (...args: unknown[]) => void

export interface RobBotConfiguration {
  discord: RobBotDiscordConfiguration
  eventHandlers: EventHandlers
  middleware?: RobBotMiddlewareConfiguration
  logger: RobBotLogger
}

export interface RobBotDiscordConfiguration {
  apiToken: string
  clientOptions?: ClientOptions
}

export interface RobBotMiddlewareConfiguration {
  messages?: AnyFunction
  logging?: LoggingMiddleware[]
  storage?: AnyFunction
}
