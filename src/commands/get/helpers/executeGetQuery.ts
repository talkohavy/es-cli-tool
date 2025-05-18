import { execSync } from 'child_process';
import { logger } from '../../../common/utils/logger/logger.js';

export async function executeGetQuery(preparedQuery: string): Promise<string> {
  try {
    const result = execSync(preparedQuery, { maxBuffer: 100 * 1024 * 1024 }).toString();

    return result;
  } catch (error) {
    console.error(error);
    logger.error('[ES Error] Failed to execute GET query...');

    if (error instanceof Error && error.message.includes('stdout maxBuffer')) {
      logger.error('[ES Error] Response exceeded buffer size. Try reducing the query size or write directly to file.');
    }

    throw error;
  }
}
