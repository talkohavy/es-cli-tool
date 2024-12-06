import { execSync } from 'child_process';
import { logger } from '../../../utils/logger/logger.js';

export async function executeImportToIndexQuery(index: string) {
  try {
    const result = execSync(
      `curl --insecure --silent -u elastic:$ELASTIC_PASSWORD -X POST "https://localhost:9200/${index}/_bulk?pretty" -H "Content-Type: application/json" --data-binary "@index.json"`,
    ).toString();

    return result;
  } catch (error) {
    console.error(error);
    logger.error(`[ES Error] Failed to populate index ${index}...`);

    throw error;
  }
}
