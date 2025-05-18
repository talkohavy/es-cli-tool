import { execSync } from 'child_process';
import os from 'os';
import { logger } from './logger/logger.js';
import { prepareGetAllIndexesNamesQuery } from './prepareGetAllIndexesNamesQuery.js';

export async function getAllIndexesNames() {
  try {
    const preparedQuery = prepareGetAllIndexesNamesQuery();

    const indexesNamesStr = execSync(preparedQuery).toString();

    const indexesNames = indexesNamesStr.split(os.EOL);

    if (indexesNames.at(-1) === '') indexesNames.pop();

    return indexesNames;
  } catch (error) {
    logger.error('[ES Error] Failed to get indexes names...', {
      newLineBefore: true,
      newLineAfter: true,
    });

    throw error;
  }
}
