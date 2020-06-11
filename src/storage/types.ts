export type id = string | number

export interface ObjectWithId {
  id: id
}

export interface StorageHandler<T extends ObjectWithId = ObjectWithId> {
  store(objectToStore: T): T
  retrieve(id: id): T
}
