import dotenv from 'dotenv';

dotenv.config();

export const serverVar = {
  PORT: Number(process.env.PORT) || 3000,
  HOST: process.env.HOST || 'localhost',
};
