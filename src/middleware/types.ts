import { Logger } from "../logging/types"
import { EventHandlers } from "../handlers"
import { StorageHandler } from "../storage/types"
export interface LoggingMiddleware {
  (logger: Logger): Logger
}

export interface EventHandlerMiddleware {
  (eventHandlers: EventHandlers): EventHandlers
}

export interface StorageMiddleware {
  (storage: StorageHandler): StorageHandler
}
