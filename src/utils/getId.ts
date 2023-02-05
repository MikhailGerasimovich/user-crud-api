import { IncomingMessage } from 'http';
import { BadRequestError } from '../errors/BadRequestError.js';

export const getId = (req: IncomingMessage): string => {
  if (!req.url) {
    throw new BadRequestError('URL not required');
  }

  const id = req.url.split('/').pop();

  if (!id) {
    throw new BadRequestError('id not required');
  }

  return id;
};
