export interface DatabaseInterface<T> {
  readAll(): Promise<T[]>;
  readById(id: string): Promise<T | undefined>;
  create(entry: T): Promise<T | undefined>;
  updateById(entry: T, id: string): Promise<T | undefined>;
  deleteById(id: string): Promise<void>;
}
