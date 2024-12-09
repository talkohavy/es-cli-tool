import { execSync } from 'child_process';
import { getContext } from '../../../utils/getContext.js';
import { logger } from '../../../utils/logger/logger.js';

export async function executeDeleteIndexQuery(index: string) {
  try {
    const context = getContext();

    if (!context) throw new Error('No context found!');

    const { url, flags } = context;
    const flagsStr = flags.join(' ');

    const requestString = `curl -X DELETE "${url}/${index}?pretty" ${flagsStr}`;

    const result = execSync(requestString).toString();

    return result;
  } catch (error) {
    console.error(error);
    logger.error(`[ES Error] Failed to delete index named ${index}...`);

    throw error;
  }
}
