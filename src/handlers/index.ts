import {
  Channel,
  Collection,
  DMChannel,
  Guild,
  GuildChannel,
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
} from "discord.js"
import { RateLimitInfo } from "../types"

// per Events section https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-channelCreate
// TODO better type than any?
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const defaultEventHandlers: Record<keyof ClientEvents, any> = {
  channelCreate: (channel: DMChannel | GuildChannel) => ({ channel }),
  channelDelete: (channel: DMChannel | GuildChannel) => ({ channel }),
  channelPinsUpdate: (channel: DMChannel | GuildChannel, time: Date) => ({
    channel,
    time,
  }),
  channelUpdate: (
    oldChannel: DMChannel | GuildChannel,
    newChannel: DMChannel | GuildChannel
  ) => ({
    oldChannel,
    newChannel,
  }),
  debug: (info: string) => ({ info }),
  emojiCreate: (emoji: GuildEmoji) => ({ emoji }),
  emojiDelete: (emoji: GuildEmoji) => ({ emoji }),
  emojiUpdate: (emoji: GuildEmoji) => ({ emoji }),
  error: (error: Error) => ({ error }),
  guildBanAdd: (guild: Guild, user: User) => ({ guild, user }),
  guildBanRemove: (guild: Guild, user: User) => ({ guild, user }),
  guildCreate: (guild: Guild) => ({ guild }),
  guildDelete: (guild: Guild) => ({ guild }),
  guildIntegrationsUpdate: (guild: Guild) => ({ guild }),
  guildMemberAdd: (member: GuildMember) => ({ member }),
  guildMemberRemove: (member: GuildMember) => ({ member }),
  guildMembersChunk: (
    members: Collection<Snowflake, GuildMember>,
    guild: Guild
  ) => ({ members, guild }),
  guildMemberSpeaking: (member: GuildMember, speaking: Readonly<Speaking>) => ({
    member,
    speaking,
  }),
  guildMemberUpdate: (oldMember: GuildMember, newMember: GuildMember) => ({
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
  messageDelete: (message: Message) => ({ message }),
  messageDeleteBulk: (messages: Collection<Snowflake, Message>) => ({
    messages,
  }),
  messageReactionAdd: (messageReaction: MessageReaction, user: User) => ({
    messageReaction,
    user,
  }),
  messageReactionRemove: (messageReaction: MessageReaction, user: User) => ({
    messageReaction,
    user,
  }),
  messageReactionRemoveAll: (message: Message) => message,
  // TODO https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-messageReactionRemoveEmoji ?
  messageReactionRemoveEmoji: (reaction: MessageReaction) => ({
    reaction,
  }),
  messageUpdate: (oldMessage: Message, newMessage: Message) => ({
    oldMessage,
    newMessage,
  }),
  presenceUpdate: (oldPresence: Presence | null, newPresence: Presence) => ({
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
  typingStart: (channel: Channel, user: User) => ({ channel, user }),
  userUpdate: (oldUser: User, newUser: User) => ({ oldUser, newUser }),
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
