import mongoose from 'mongoose';
import { env } from '../config/env';
import { logger } from '../shared/logger/logger';

export const connectDatabase = async (): Promise<void> => {
  try {
    mongoose.set('strictQuery', true);

    await mongoose.connect(env.MONGO_URI);

    logger.info('MongoDB connected successfully');
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unknown database error';

    logger.error(`MongoDB connection failed: ${message}`);

    process.exit(1);
  }
};