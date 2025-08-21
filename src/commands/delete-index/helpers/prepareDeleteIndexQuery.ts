import { getContext } from '../../../common/utils/getContext.js';
import { logger } from '../../../lib/logger/logger.js';

export function prepareDeleteIndexQuery(index: string) {
  try {
    const context = getContext();

    if (!context) throw new Error('No context found!');

    const { url, flags } = context;

    const requestString = `curl -X DELETE "${url}/${index}?pretty" ${flags}`;

    return requestString;
  } catch (error) {
    console.error(error);
    logger.error(`[ES Error] Failed to prepare the delete index query for index named ${index}...`);

    throw error;
  }
}
