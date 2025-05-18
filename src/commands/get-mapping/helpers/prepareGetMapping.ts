import { getContext } from '../../../common/utils/getContext.js';
import { logger } from '../../../common/utils/logger/logger.js';

export async function prepareGetMapping(index: string) {
  try {
    const context = getContext();

    if (!context) throw new Error('No context found!');

    const { url, flags } = context;

    const requestString = `curl -X GET "${url}/${index}/_mapping?pretty" ${flags}`;

    return requestString;
  } catch (error) {
    console.error(error);
    logger.error('[ES Error] Failed to execute get-mapping request...');

    throw error;
  }
}
