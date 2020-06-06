import { RobBotConfiguration } from "./types"
import { ConsoleLogger } from "../logging"
import { createDefaultHandlers } from "../handlers"

export const createDefaultConfiguration = (
  discordApiToken: string
): RobBotConfiguration => {
  const logger = ConsoleLogger

  return {
    discord: {
      apiToken: discordApiToken,
    },
    eventHandlers: createDefaultHandlers(logger),
    logger,
  }
}
