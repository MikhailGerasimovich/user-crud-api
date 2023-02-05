import { HTTPStatusCodes } from '../constants/HTTPStatusCodes.js';
import { BaseHttpError } from './BaseHttpError.js';

export class InternalServerError extends BaseHttpError {
  name: string;
  description: string;

  constructor(message: string) {
    super(message);
    this.name = 'INTERNAL_SERVER_ERROR';
    this.description = message;
    this.statusCode = HTTPStatusCodes.INTERNAL_SERVER_ERROR;
  }
}
