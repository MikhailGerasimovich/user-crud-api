import { IncomingMessage, ServerResponse } from 'http';
import { HTTPStatusCodes } from '../constants/HTTPStatusCodes.js';
import { getId } from '../utils/getId.js';
import { bodyParser } from '../utils/bodyParser.js';
import { userService } from './service.js';
import { CreateUserDto } from './dto/CreateUserDto.js';
import { UpdateUserDto } from './dto/UpdateUserDto.js';

class UserController {
  async readAll(req: IncomingMessage, res: ServerResponse<IncomingMessage>) {
    const users = await userService.readAll();
    res.statusCode = HTTPStatusCodes.OK;
    res.end(JSON.stringify(users));
  }

  async readById(req: IncomingMessage, res: ServerResponse<IncomingMessage>) {
    const id = getId(req);
    const user = await userService.readById(id);
    res.statusCode = HTTPStatusCodes.OK;
    res.end(JSON.stringify(user));
  }

  async create(req: IncomingMessage, res: ServerResponse<IncomingMessage>) {
    const user: CreateUserDto = await bodyParser(req);
    const createdUser = await userService.create(user);
    res.statusCode = HTTPStatusCodes.CREATED;
    res.end(JSON.stringify(createdUser));
  }

  async update(req: IncomingMessage, res: ServerResponse<IncomingMessage>) {
    const id = getId(req);
    const user: UpdateUserDto = await bodyParser(req);
    const updatedUser = await userService.update(user, id);
    res.statusCode = HTTPStatusCodes.OK;
    res.end(JSON.stringify(updatedUser));
  }

  async deleteById(req: IncomingMessage, res: ServerResponse<IncomingMessage>) {
    const id = getId(req);
    await userService.deleteById(id);
    res.statusCode = HTTPStatusCodes.NO_CONTENT;
    res.end();
  }
}

export const userController = new UserController();
