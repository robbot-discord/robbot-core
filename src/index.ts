import { RobBotConfiguration } from "./configuration/types"
import { RobBotClient } from "./client"

export const createClient = (
  configuration: RobBotConfiguration
): RobBotClient => {
  return new RobBotClient(configuration)
}

export const runClient = (client: RobBotClient): void => client.run()
