import { execSync } from 'child_process';
import { getContext } from '../../../common/utils/getContext.js';
import { logger } from '../../../common/utils/logger/logger.js';

type ExecuteAddQueryProps = {
  index: string;
  query: Record<string, any>;
};

export async function executeGetQuery(props: ExecuteAddQueryProps) {
  try {
    const { index, query } = props;

    const context = getContext();

    if (!context) throw new Error('No context found!');

    const { url, flags } = context;
    const queryAsStr = JSON.stringify(query);

    const requestString = `curl -X POST "${url}/${index}/_search?pretty" ${flags} -d' ${queryAsStr}'`;

    const result = execSync(requestString, { maxBuffer: 100 * 1024 * 1024 }).toString();

    return result;
  } catch (error) {
    console.error(error);
    logger.error('[ES Error] Failed to execute GET query...');

    if (error instanceof Error && error.message.includes('stdout maxBuffer')) {
      logger.error('[ES Error] Response exceeded buffer size. Try reducing the query size or write directly to file.');
    }

    throw error;
  }
}
