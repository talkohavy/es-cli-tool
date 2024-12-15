import { logger } from './logger/logger.js';

export async function validateAndTransformQuery(queryStr: string): Promise<Record<string, any>> {
  try {
    const query = JSON.parse(queryStr);

    return query;
  } catch (error) {
    logger.error('Invalid json... failed to parse query...');

    throw error;
  }
}
