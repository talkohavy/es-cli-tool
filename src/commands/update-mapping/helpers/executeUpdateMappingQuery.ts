import { execSync } from 'child_process';
import { getContext } from '../../../common/utils/getContext.js';
import { logger } from '../../../common/utils/logger/logger.js';

type ExecuteUpdateMappingQueryProps = {
  index: string;
  query: Record<string, any>;
};

export async function executeUpdateMappingQuery(props: ExecuteUpdateMappingQueryProps) {
  try {
    const { index, query } = props;

    const context = getContext();

    if (!context) throw new Error('No context found!');

    const { url, flags } = context;
    const queryAsStr = JSON.stringify(query);

    const requestString = `curl -X PUT "${url}/${index}/_mapping?pretty" ${flags} -d' ${queryAsStr}'`;

    const result = execSync(requestString).toString();

    return result;
  } catch (error) {
    console.error(error);
    logger.error('[ES Error] Failed to execute an update on mapping...');

    throw error;
  }
}
