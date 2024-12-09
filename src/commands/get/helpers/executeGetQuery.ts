import { execSync } from 'child_process';
import { getContext } from '../../../utils/getContext.js';
import { logger } from '../../../utils/logger/logger.js';

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

    const requestString = `curl -X GET "${url}/${index}/_search?pretty" ${flags} -d' ${queryAsStr}'`;

    const result = execSync(requestString).toString();

    return result;
  } catch (error) {
    console.error(error);
    logger.error('[ES Error] Failed to execute GET query...');

    throw error;
  }
}
