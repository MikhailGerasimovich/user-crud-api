import { validate as isValidId } from 'uuid';
import { User } from './User.js';
import { userDB as db } from '../db/UserDatabase.js';
import { NotFoundError } from '../errors/NotFoundError.js';
import { BadRequestError } from '../errors/BadRequestError.js';
import { CreateUserDto } from './dto/CreateUserDto.js';
import { UpdateUserDto } from './dto/UpdateUserDto.js';
import { isValidUser } from '../utils/isValidUser.js';

class UserService {
  async readAll() {
    return await db.readAll();
  }

  async readById(id: string) {
    if (!isValidId(id)) {
      throw new BadRequestError('not valid uuid');
    }

    const user = await db.readById(id);
    if (!user) {
      throw new NotFoundError(`user with uuid ${id} not found`);
    }

    return user;
  }

  async create(user: CreateUserDto) {
    if (!user.username || !user.age || !user.hobbies) {
      throw new BadRequestError('required parameters not passed');
    }

    if (!isValidUser(user)) {
      throw new BadRequestError('received parameters are incorrect');
    }

    const createdUser = new User(user.username, user.age, user.hobbies);
    return await db.create(createdUser);
  }

  async update(user: UpdateUserDto, id: string) {
    if (!isValidId(id)) {
      throw new BadRequestError('not valid uuid');
    }

    const oldUser = await db.readById(id);

    if (!oldUser) {
      throw new NotFoundError(`user with uuid ${id} not found`);
    }

    const newUser = {
      username: user.username ? user.username : oldUser.username,
      age: user.age ? user.age : oldUser.age,
      hobbies: user.hobbies ? user.hobbies : oldUser.hobbies,
    };

    const updatedUser = new User(newUser.username, newUser.age, newUser.hobbies, id);

    return await db.updateById(updatedUser, id);
  }

  async deleteById(id: any) {
    if (!isValidId(id)) {
      throw new BadRequestError('not valid uuid');
    }
    await db.deleteById(id);
  }
}

export const userService = new UserService();
