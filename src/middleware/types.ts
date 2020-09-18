import { Logger } from "../logging/types"
import { EventCreator, EventHandlers } from "../handlers/types"
import { StorageHandler } from "../storage/types"

export interface LoggingMiddleware {
  (logger: Logger): Logger
}

export interface EventHandlerMiddleware {
  (eventHandlers: EventHandlers): EventHandlers
  (eventCreator: EventCreator): EventCreator
}

export interface StorageMiddleware {
  (storage: StorageHandler): StorageHandler
}
