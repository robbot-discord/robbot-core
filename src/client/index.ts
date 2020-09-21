import { Client, ClientEvents } from "discord.js"
import { RobBotConfiguration } from "../configuration/types"
import { Logger } from "../logging/types"
import { produce } from "immer"
import R from "ramda"
import { EventHandlers } from "../handlers/types"

export class RobBotClient extends Client {
  configuration: RobBotConfiguration

  constructor(configuration: RobBotConfiguration) {
    super(configuration.discord.clientOptions)
    this.configuration = R.clone(configuration)

    // event handlers last, in case middleware applies to them
    // TODO add event handler middleware...
    this.applyMiddleware()
    this.registerEventHandlers()
  }

  applyMiddleware = (
    client: RobBotClient = this,
    { eventHandlers: handlersOrFunc, logger, middleware, storage } = this
      .configuration
  ): void => {
    if (middleware) {
      const {
        eventHandlerMiddleware,
        loggingMiddleware,
        storageMiddleware,
      } = middleware

      const eventHandlers =
        typeof handlersOrFunc === "function"
          ? handlersOrFunc(this)
          : handlersOrFunc

      client.configuration = produce(client.configuration, (draft) => {
        draft.eventHandlers =
          eventHandlerMiddleware?.reduce(
            (newEventHandlers, currentMiddleware): EventHandlers =>
              currentMiddleware(newEventHandlers),
            eventHandlers
          ) ?? eventHandlers

        draft.logger =
          loggingMiddleware?.reduce(
            (newLogger, currentMiddleware): Logger =>
              currentMiddleware(newLogger),
            logger
          ) ?? logger

        draft.storage =
          storageMiddleware?.reduce(
            (newStorage, currentMiddleware) => currentMiddleware(newStorage),
            storage
          ) ?? storage
      })
    }
  }

  registerEventHandlers = (client: RobBotClient = this): void => {
    const givenEventHandlers = client.configuration.eventHandlers
    const eventHandlers =
      typeof givenEventHandlers === "function"
        ? givenEventHandlers(this)
        : givenEventHandlers

    // TODO is there a type-safe way to do this?
    const events = (Object.keys(
      eventHandlers
    ) as unknown) as (keyof ClientEvents)[]

    for (const event of events) {
      const handler = eventHandlers[event]
      client.on(event, (...args) => {
        try {
          handler(...args)
        } catch (error) {
          const logger = client.configuration.logger

          logger.error(
            `Uncaught error in event handler! Event: <${event}>, error: <${error}>`
          )
        }
      })
    }
  }

  run = async (
    client: RobBotClient = this,
    discordApiToken: string = this.configuration.discord.apiToken
  ): Promise<void> => {
    await client
      .login(discordApiToken)
      .then(() => {
        return
      })
      .catch((error) => {
        client.configuration.logger.error(
          `Unexpected error, client crashed: ${error}`
        )

        return
      })
  }
}
