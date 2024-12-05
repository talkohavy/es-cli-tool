import { execSync } from 'child_process';
import { logger } from '../../../utils/logger/logger.js';

export async function executeCreateIndexQuery(indexName: string) {
  try {
    const result = execSync(
      `curl --insecure --silent -u elastic:$ELASTIC_PASSWORD -X PUT 'https://localhost:9200/${indexName}'`,
    ).toString();

    return result;
  } catch (error) {
    console.error(error);
    logger.error(`[ES Error] Failed to create index named ${indexName}...`);

    throw error;
  }
}
