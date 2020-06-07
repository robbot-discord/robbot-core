import { LoggingMiddleware, EventHandlerMiddleware } from "../middleware/types"
import { ClientOptions } from "discord.js"
import { Logger } from "../logging/types"
import { EventHandlers } from "../handlers"

export type AnyFunction = (...args: unknown[]) => void

export interface RobBotConfiguration {
  discord: RobBotDiscordConfiguration
  eventHandlers: EventHandlers
  middleware?: RobBotMiddlewareConfiguration
  logger: Logger
}

export interface RobBotDiscordConfiguration {
  apiToken: string
  clientOptions?: ClientOptions
}

export interface RobBotMiddlewareConfiguration {
  eventHandlerMiddleware?: EventHandlerMiddleware[]
  loggingMiddleware?: LoggingMiddleware[]
  storageMiddleware?: AnyFunction[]
}
