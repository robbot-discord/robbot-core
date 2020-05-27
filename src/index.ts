import { RobBotConfiguration } from "./configuration/types"
import { RobBotClient } from "./client"
import { createDefaultConfiguration } from "./configuration"

export { createDefaultConfiguration } from "./configuration"

export const createClient = (
  configurationOrDiscordApiToken: RobBotConfiguration | string
): RobBotClient => {
  if (typeof configurationOrDiscordApiToken === "string") {
    const discordApiToken = configurationOrDiscordApiToken
    return new RobBotClient(createDefaultConfiguration(discordApiToken))
  }

  const configuration: RobBotConfiguration = configurationOrDiscordApiToken
  return new RobBotClient(configuration)
}

export const runClient = (client: RobBotClient): void => client.run()

export default createClient
