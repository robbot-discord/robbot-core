import {
  Channel,
  Collection,
  Guild,
  GuildEmoji,
  GuildMember,
  Invite,
  Message,
  MessageReaction,
  Presence,
  Role,
  Snowflake,
  Speaking,
  TextChannel,
  User,
  VoiceState,
  ClientEvents,
  PartialUser,
  PartialGuildMember,
  PartialMessage,
  PartialDMChannel,
  CloseEvent,
} from "discord.js"
import { RateLimitInfo } from "../types"

// TODO is there a better type constraint than 'void' ?
export type EventHandlers = {
  [K in keyof ClientEvents]: (...args: ClientEvents[K]) => void
}

// per Events section https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-channelCreate
export const defaultEventHandlers: EventHandlers = {
  channelCreate: (channel: Channel) => ({ channel }),
  channelDelete: (channel: Channel) => ({ channel }),
  channelPinsUpdate: (channel: Channel, time: Date) => ({
    channel,
    time,
  }),
  channelUpdate: (oldChannel: Channel, newChannel: Channel) => ({
    oldChannel,
    newChannel,
  }),
  debug: (info: string) => ({ info }),
  emojiCreate: (emoji: GuildEmoji) => ({ emoji }),
  emojiDelete: (emoji: GuildEmoji) => ({ emoji }),
  emojiUpdate: (emoji: GuildEmoji) => ({ emoji }),
  error: (error: Error) => ({ error }),
  guildBanAdd: (guild: Guild, user: User | PartialUser) => ({
    guild,
    user,
  }),
  guildBanRemove: (guild: Guild, user: User | PartialUser) => ({
    guild,
    user,
  }),
  guildCreate: (guild: Guild) => ({ guild }),
  guildDelete: (guild: Guild) => ({ guild }),
  guildIntegrationsUpdate: (guild: Guild) => ({ guild }),
  guildMemberAdd: (member: GuildMember | PartialGuildMember) => ({
    member,
  }),
  guildMemberRemove: (member: GuildMember | PartialGuildMember) => ({
    member,
  }),
  guildMembersChunk: (
    members: Collection<Snowflake, GuildMember | PartialGuildMember>,
    guild: Guild
  ) => ({ members, guild }),
  guildMemberSpeaking: (
    member: GuildMember | PartialGuildMember,
    speaking: Readonly<Speaking>
  ) => ({
    member,
    speaking,
  }),
  guildMemberUpdate: (
    oldMember: GuildMember | PartialGuildMember,
    newMember: GuildMember | PartialGuildMember
  ) => ({
    oldMember,
    newMember,
  }),
  guildUnavailable: (guild: Guild) => guild,
  guildUpdate: (oldGuild: Guild, newGuild: Guild) => ({
    oldGuild,
    newGuild,
  }),
  invalidated: () => ({}),
  inviteCreate: (invite: Invite) => ({ invite }),
  inviteDelete: (invite: Invite) => ({ invite }),
  message: (message: Message) => ({ message }),
  messageDelete: (message: Message | PartialMessage) => ({ message }),
  messageDeleteBulk: (
    messages: Collection<Snowflake, Message | PartialMessage>
  ) => ({
    messages,
  }),
  messageReactionAdd: (
    messageReaction: MessageReaction,
    user: User | PartialUser
  ) => ({
    messageReaction,
    user,
  }),
  messageReactionRemove: (
    messageReaction: MessageReaction,
    user: User | PartialUser
  ) => ({
    messageReaction,
    user,
  }),
  messageReactionRemoveAll: (message: Message | PartialMessage) => message,
  // TODO https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-messageReactionRemoveEmoji ?
  messageReactionRemoveEmoji: (reaction: MessageReaction) => ({
    reaction,
  }),
  messageUpdate: (
    oldMessage: Message | PartialMessage,
    newMessage: Message | PartialMessage
  ) => ({
    oldMessage,
    newMessage,
  }),
  presenceUpdate: (
    oldPresence: Presence | undefined,
    newPresence: Presence
  ) => ({
    oldPresence,
    newPresence,
  }),
  rateLimit: (rateLimitInfo: RateLimitInfo) => ({ rateLimitInfo }),
  ready: () => ({}),
  roleCreate: (role: Role) => ({ role }),
  roleDelete: (role: Role) => ({ role }),
  roleUpdate: (oldRole: Role, newRole: Role) => ({
    oldRole,
    newRole,
  }),
  shardDisconnect: (event: CloseEvent, id: number) => ({ event, id }),
  shardError: (error: Error, shardID: number) => ({ error, shardID }),
  shardReady: (id: number, unavailableGuilds?: Set<string>) => ({
    id,
    unavailableGuilds,
  }),
  shardReconnecting: (id: number) => id,
  shardResume: (id: number, replayedEvents: number) => ({
    id,
    replayedEvents,
  }),
  typingStart: (
    channel: Channel | PartialDMChannel,
    user: User | PartialUser
  ) => ({
    channel,
    user,
  }),
  userUpdate: (oldUser: User | PartialUser, newUser: User | PartialUser) => ({
    oldUser,
    newUser,
  }),
  voiceStateUpdate: (oldState: VoiceState, newState: VoiceState) => ({
    oldState,
    newState,
  }),
  warn: (info: string) => ({ info }),
  webhookUpdate: (channel: TextChannel) => ({ channel }),
  // TODO This are not documented...
  disconnect: () => ({}),
  guildMemberAvailable: () => ({}),
  // per Discord.Constants.Events ...
  //   raw: () => ({}),
  //   reconnecting: () => ({}),
  //   resumed: () => ({}),
  //   voiceBroadcastSubscribe: () => ({}),
  //  voiceBroadcastUnsubscribe: () => ({}),
}
