import { IncomingMessage, ServerResponse } from 'http';
import { BaseHttpError } from '../errors/BaseHttpError.js';
import { HTTPStatusCodes } from '../constants/HTTPStatusCodes.js';
import { NotFoundError } from '../errors/NotFoundError.js';
import { userRouter } from '../users/userRouter.js';

export const router = async (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
  res.setHeader('Content-type', 'application/json');
  try {
    const url = req.url;
    if (url?.startsWith('/api/users')) {
      await userRouter(req, res);
    } else {
      throw new NotFoundError('End point not found');
    }
  } catch (error) {
    if (error instanceof BaseHttpError) {
      res.statusCode = error.statusCode;
      res.end(JSON.stringify(error));
    } else {
      const responseError = {
        name: 'INTERNAL_SERVER_ERROR',
        description: 'unhandled error',
        statusCode: HTTPStatusCodes.INTERNAL_SERVER_ERROR,
      };

      res.statusCode = responseError.statusCode;
      res.end(JSON.stringify(responseError));
    }
    console.log(error);
  }
};
