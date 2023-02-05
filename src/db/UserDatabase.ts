import { DatabaseOnArray } from './DatabaseOnArray.js';
import { UserInterface } from '../users/UserInterface.js';
import { DatabaseOnMap } from './DatabaseOnMap.js';

const createUserDatabaseOnArray = () => {
  return new DatabaseOnArray<UserInterface>();
};

const createUserDatabaseOnMap = () => {
  return new DatabaseOnMap<UserInterface>();
};

const dbType = process.env.DB_TYPE;

export const userDB = dbType === 'map' ? createUserDatabaseOnMap() : createUserDatabaseOnArray();
