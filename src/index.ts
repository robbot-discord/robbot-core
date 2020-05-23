import { Client, ClientEvents } from "discord.js"
import { defaultEventHandlers } from "./handlers"

export const registerEventHandlers = (client: Client): void => {
  // TODO is there a type-safe way to do this?
  const events = (Object.keys(
    defaultEventHandlers
  ) as unknown) as (keyof ClientEvents)[]

  for (const event of events) {
    const handler = defaultEventHandlers[event]
    // TODO is there a type-safe way to do this?
    client.on(event, handler as never)
  }
}
