import { execSync } from 'child_process';
import { logger } from '../../../utils/logger/logger.js';

export async function executeGetMapping(index: string) {
  try {
    const result = execSync(
      `curl --insecure -u elastic:$ELASTIC_PASSWORD -X GET 'https://localhost:9200/${index}/_mapping?pretty'`,
    ).toString();

    return result;
  } catch (error) {
    console.error(error);
    logger.error('[ES Error] Failed to execute get-mapping request...');

    throw error;
  }
}
