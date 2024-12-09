import { execSync } from 'child_process';
import { getContext } from '../../../utils/getContext.js';
import { logger } from '../../../utils/logger/logger.js';

type ExecuteAddQueryProps = {
  index: string;
  query: Record<string, any>;
};

export async function executeAddQuery(props: ExecuteAddQueryProps) {
  try {
    const { index, query } = props;

    const context = getContext();

    if (!context) throw new Error('No context found!');

    const { url, flags } = context;
    const queryAsStr = JSON.stringify(query);

    const requestString = `curl -X POST "${url}/${index}/_doc?pretty" ${flags} -d' ${queryAsStr}'`;

    const result = execSync(requestString).toString();

    return result;
  } catch (error) {
    console.error(error);
    logger.error('[ES Error] Failed to execute POST query...');

    throw error;
  }
}
