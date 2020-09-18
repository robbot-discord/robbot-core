import {
  LoggingMiddleware,
  EventHandlerMiddleware,
  StorageMiddleware,
} from "../middleware/types"
import { ClientOptions } from "discord.js"
import { Logger } from "../logging/types"
import { EventHandlers } from "../handlers/types"
import { StorageHandler } from "../storage"
import { RobBotClient } from "../client"

export type AnyFunction = (...args: unknown[]) => void

export interface RobBotConfiguration {
  discord: RobBotDiscordConfiguration
  eventHandlers: EventHandlers | ((client: RobBotClient) => EventHandlers)
  middleware?: RobBotMiddlewareConfiguration
  logger: Logger
  storage: StorageHandler
}

export interface RobBotDiscordConfiguration {
  apiToken: string
  clientOptions?: ClientOptions
}

export interface RobBotMiddlewareConfiguration {
  eventHandlerMiddleware?: EventHandlerMiddleware[]
  loggingMiddleware?: LoggingMiddleware[]
  storageMiddleware?: StorageMiddleware[]
}
