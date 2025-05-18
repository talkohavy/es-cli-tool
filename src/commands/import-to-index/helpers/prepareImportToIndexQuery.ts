import { getContext } from '../../../common/utils/getContext.js';
import { logger } from '../../../common/utils/logger/logger.js';

export async function prepareImportToIndexQuery(index: string) {
  try {
    const context = getContext();

    if (!context) throw new Error('No context found!');

    const { url, flags } = context;

    const requestString = `curl -X POST "${url}/${index}/_bulk?pretty" ${flags} --data-binary "@__FILE_NAME__"`;

    return requestString;
  } catch (error) {
    console.error(error);
    logger.error(`[ES Error] Failed to populate index ${index}...`);

    throw error;
  }
}
