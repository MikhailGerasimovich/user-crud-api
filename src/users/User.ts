import { v4 } from 'uuid';
import { UserInterface } from './UserInterface.js';

export class User implements UserInterface {
  id: string;
  username: string;
  age: number;
  hobbies: string[];

  constructor(username: string, age: number, hobbies: string[], id?: string) {
    id ? (this.id = id) : (this.id = v4());
    this.username = username;
    this.age = age;
    this.hobbies = hobbies;
  }
}
