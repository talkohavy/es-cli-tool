import { execSync } from 'child_process';
import { getContext } from '../../../utils/getContext.js';
import { logger } from '../../../utils/logger/logger.js';

export async function executeGetMapping(index: string) {
  try {
    const context = getContext();

    if (!context) throw new Error('No context found!');

    const { url, flags } = context;

    const requestString = `curl -X GET "${url}/${index}/_mapping?pretty" ${flags}`;

    const result = execSync(requestString).toString();

    return result;
  } catch (error) {
    console.error(error);
    logger.error('[ES Error] Failed to execute get-mapping request...');

    throw error;
  }
}
