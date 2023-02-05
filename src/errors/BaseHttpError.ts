export class BaseHttpError extends Error {
  // @ts-ignore
  statusCode: number;
  constructor(message: string) {
    super(message);
  }
}
