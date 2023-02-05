import { BadRequestError } from '../errors/BadRequestError.js';
import { DatabaseInterface } from './DatabaseInterface.js';

export class DatabaseOnArray<T> implements DatabaseInterface<T> {
  _storage: T[];

  constructor() {
    this._storage = [];
  }

  async readAll(): Promise<T[]> {
    return new Promise<T[]>((resolve) => {
      const allEntries = [...this._storage];
      resolve(allEntries);
    });
  }

  async readById(id: string): Promise<T | undefined> {
    return new Promise((resolve) => {
      // @ts-ignore
      const entry = this._storage.find((entry) => entry.id === id);
      resolve(entry);
    });
  }

  async create(entry: T): Promise<T | undefined> {
    return new Promise<T>((resolve) => {
      this._storage.push(entry);
      resolve(entry);
    });
  }

  async updateById(entry: T, id: string): Promise<T | undefined> {
    return new Promise((resolve) => {
      // @ts-ignore
      const oldEntry = this._storage.find((entry) => entry.id === id);
      if (!oldEntry) {
        throw new BadRequestError(`Entry with id ${id} not found`);
      }
      const index = this._storage.indexOf(oldEntry);
      this._storage[index] = entry;
      resolve(entry);
    });
  }

  async deleteById(id: string): Promise<void> {
    return new Promise((resolve) => {
      // @ts-ignore
      const entry = this._storage.find((entry) => entry.id === id);
      if (!entry) {
        throw new BadRequestError(`Entry with id ${id} not found`);
      }
      const index = this._storage.indexOf(entry);
      this._storage.splice(index, 1);
      resolve();
    });
  }
}
