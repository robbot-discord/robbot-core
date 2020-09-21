import { Logger } from "../logging/types"
import { EventHandlersCreator, EventHandlers } from "../handlers/types"
import { StorageHandler } from "../storage/types"

export interface LoggingMiddleware {
  (logger: Logger): Logger
}

export interface EventHandlerMiddleware {
  (eventHandlers: EventHandlers): EventHandlers
  (eventCreator: EventHandlersCreator): EventHandlersCreator
}

export interface StorageMiddleware {
  (storage: StorageHandler): StorageHandler
}
