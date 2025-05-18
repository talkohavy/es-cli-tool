import { execSync } from 'child_process';
import { logger } from '../../../common/utils/logger/logger.js';

export async function executeAddQuery(preparedQuery: string): Promise<string> {
  try {
    const result = execSync(preparedQuery).toString();

    return result;
  } catch (error) {
    console.error(error);
    logger.error('[ES Error] Failed to execute POST query...');

    throw error;
  }
}
