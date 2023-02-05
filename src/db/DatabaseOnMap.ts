import { BadRequestError } from '../errors/BadRequestError.js';
import { DatabaseInterface } from './DatabaseInterface.js';

export class DatabaseOnMap<T> implements DatabaseInterface<T> {
  _storage: Map<string, T>;

  constructor() {
    this._storage = new Map<string, T>();
  }
  async readAll(): Promise<T[]> {
    return Array.from(this._storage.values());
  }

  async readById(id: string): Promise<T | undefined> {
    return this._storage.get(id);
  }

  async create(entry: T): Promise<T | undefined> {
    // @ts-ignore
    const id = entry.id;
    return this._storage.set(id, entry).get(id);
  }

  async updateById(entry: T, id: string): Promise<T | undefined> {
    if (!this._storage.delete(id)) {
      return undefined;
    }

    return this._storage.set(id, entry).get(id);
  }

  async deleteById(id: string): Promise<void> {
    if (!this._storage.delete(id)) {
      throw new BadRequestError(`Entry with id ${id} not found`);
    }
  }
}
