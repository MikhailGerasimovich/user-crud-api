import { IncomingMessage, ServerResponse } from 'http';
import { NotFoundError } from '../errors/NotFoundError.js';
import { userController } from './controller.js';
import { HTTPMethods } from '../constants/HTTPMethods.js';

export const userRouter = async (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
  const method = req.method;
  const url = req.url;

  switch (method) {
    case HTTPMethods.GET: {
      //GET: ALL
      if (url === '/api/users' || url === '/api/users/') {
        await userController.readAll(req, res);
        //GET: BY ID
      } else {
        await userController.readById(req, res);
      }
      break;
    }
    case HTTPMethods.POST: {
      if (url === '/api/users' || url === '/api/users/') {
        await userController.create(req, res);
      } else {
        throw new NotFoundError('End point not found');
      }
      break;
    }
    case HTTPMethods.PUT: {
      await userController.update(req, res);
      break;
    }
    case HTTPMethods.DELETE: {
      await userController.deleteById(req, res);
      break;
    }
    default: {
      throw new NotFoundError('Incorrect request method');
    }
  }
};
