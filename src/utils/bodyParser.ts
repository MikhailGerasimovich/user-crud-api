import { IncomingMessage } from 'http';
import { InternalServerError } from '../errors/InternalServerError.js';

export const bodyParser = async (req: IncomingMessage): Promise<{}> => {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req
      .on('data', (chunk) => {
        chunks.push(chunk);
      })
      .on('end', () => {
        const str = Buffer.concat(chunks).toString();
        try {
          resolve(str ? JSON.parse(str) : {});
        } catch (err) {
          reject(new InternalServerError('Invalid JSON'));
        }
      })
      .on('error', () => {
        reject(new InternalServerError('Body parsing error'));
      });
  });
};
