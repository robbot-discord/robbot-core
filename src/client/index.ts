import { Client, ClientEvents } from "discord.js"
import { RobBotConfiguration } from "../configuration/types"
import { Logger } from "../logging/types"
import { produce } from "immer"
import R from "ramda"
import { EventHandlers } from "../handlers"

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
    { eventHandlers, logger, middleware } = this.configuration
  ): void => {
    if (middleware) {
      const {
        eventHandlerMiddleware,
        loggingMiddleware,
        storageMiddleware,
      } = middleware

      client.configuration = produce(client.configuration, (draft) => {
        draft.eventHandlers =
          eventHandlerMiddleware?.reduce(
            (eventHandlers, currentMiddleware): EventHandlers =>
              currentMiddleware(eventHandlers),
            eventHandlers
          ) ?? eventHandlers

        draft.logger =
          loggingMiddleware?.reduce(
            (logger, currentMiddleware): Logger => currentMiddleware(logger),
            logger
          ) ?? logger

        // TODO storage
      })
    }
  }

  registerEventHandlers = (client: RobBotClient = this): void => {
    const eventHandlers = client.configuration.eventHandlers

    // TODO is there a type-safe way to do this?
    const events = (Object.keys(
      eventHandlers
    ) as unknown) as (keyof ClientEvents)[]

    for (const event of events) {
      const handler = eventHandlers[event]
      // TODO is there a type-safe way to do this?
      client.on(event, handler as never)
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
