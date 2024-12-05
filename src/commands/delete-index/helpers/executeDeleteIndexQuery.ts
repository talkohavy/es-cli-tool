import { execSync } from 'child_process';
import { logger } from '../../../utils/logger/logger.js';

export async function executeDeleteIndexQuery(index: string) {
  try {
    const result = execSync(
      `curl --insecure --silent -u elastic:$ELASTIC_PASSWORD -X DELETE 'https://localhost:9200/${index}'`,
    ).toString();

    return result;
  } catch (error) {
    console.error(error);
    logger.error(`[ES Error] Failed to delete index named ${index}...`);

    throw error;
  }
}
