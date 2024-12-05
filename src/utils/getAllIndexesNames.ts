import { execSync } from 'child_process';
import os from 'os';
import { logger } from './logger/logger.js';

export async function getAllIndexesNames() {
  try {
    const indexesNamesStr = execSync(
      'curl --silent --cacert ~/http_ca.crt -u elastic:$ELASTIC_PASSWORD -X GET "https://localhost:9200/_cat/indices?h=index"',
    ).toString();

    const indexesNames = indexesNamesStr.split(os.EOL);
    indexesNames.pop(); // <--- last element is an empty string. P.s. even if array is empty, this will not fail, and array will stay empty.

    return indexesNames;
  } catch (error) {
    console.error(error);
    logger.error('[ES Error] Failed to get indexes names...');

    throw error;
  }
}
