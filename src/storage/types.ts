export type id = string | number

export interface ObjectWithId {
  id: id
}

export interface StorageHandler {
  store<T extends ObjectWithId>(objectToStore: T): T
  retrieve<T extends ObjectWithId>(id: id): T
}
