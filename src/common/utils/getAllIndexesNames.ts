import { execSync } from 'child_process';
import os from 'os';
import { getContext } from './getContext.js';
import { logger } from './logger/logger.js';

export async function getAllIndexesNames() {
  try {
    const context = getContext();

    if (!context) throw new Error('No context found!');

    const { url, flags } = context;

    const requestString = `curl -X GET "${url}/_cat/indices?h=index" ${flags}`;

    const indexesNamesStr = execSync(requestString).toString();

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
