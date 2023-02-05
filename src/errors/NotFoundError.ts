import { HTTPStatusCodes } from '../constants/HTTPStatusCodes.js';
import { BaseHttpError } from './BaseHttpError.js';

export class NotFoundError extends BaseHttpError {
  name: string;
  description: string;

  constructor(message: string) {
    super(message);
    this.name = 'NOT_FOUND_ERROR';
    this.description = message;
    this.statusCode = HTTPStatusCodes.NOT_FOUND;
  }
}
