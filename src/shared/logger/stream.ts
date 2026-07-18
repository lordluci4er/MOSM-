import { logger } from './logger';

export const stream = {
  write(message: string): void {
    logger.info(message.trim());
  },
};