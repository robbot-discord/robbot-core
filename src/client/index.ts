import { Client, ClientEvents } from "discord.js"
import { RobBotConfiguration } from "../configuration/types"
import { RobBotLogger } from "../logging/types"
import { produce } from "immer"
import R from "ramda"

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
    { logger, middleware } = this.configuration
  ): void => {
    if (middleware) {
      const { logging } = middleware

      client.configuration = produce(client.configuration, (draft) => {
        draft.logger =
          logging?.reduce(
            (logger, currentMiddleware): RobBotLogger =>
              currentMiddleware(logger),
            logger
          ) ?? logger
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

  run = (client: RobBotClient = this): void => {
    try {
      client.run()
    } catch (error) {
      client.configuration.logger.error(
        `Unexpected error, client crashed: ${error}`
      )
    }
  }
}
