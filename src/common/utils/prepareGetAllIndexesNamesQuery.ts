import { getContext } from './getContext.js';
import { logger } from './logger/logger.js';

export function prepareGetAllIndexesNamesQuery() {
  try {
    const context = getContext();

    if (!context) throw new Error('No context found!');

    const { url, flags } = context;

    const requestString = `curl -X GET "${url}/_cat/indices?h=index" ${flags}`;

    return requestString;
  } catch (error) {
    logger.error('[ES Error] Failed to get indexes names...', {
      newLineBefore: true,
      newLineAfter: true,
    });

    throw error;
  }
}
