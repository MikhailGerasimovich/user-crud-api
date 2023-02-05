import { HTTPStatusCodes } from '../constants/HTTPStatusCodes.js';
import { BaseHttpError } from './BaseHttpError.js';

export class BadRequestError extends BaseHttpError {
  name: string;
  description: string;

  constructor(message: string) {
    super(message);
    this.name = 'BAD_REQUEST_ERROR';
    this.description = message;
    this.statusCode = HTTPStatusCodes.BAD_REQUEST;
  }
}
