import { RobBotConfiguration } from "./types"
import { ConsoleLogger } from "../logging"
import { defaultEventHandlers } from "../handlers"

export const createDefaultConfiguration = (
  discordApiToken: string
): RobBotConfiguration => {
  return {
    discord: {
      apiToken: discordApiToken,
    },
    eventHandlers: defaultEventHandlers,
    logger: ConsoleLogger,
  }
}
