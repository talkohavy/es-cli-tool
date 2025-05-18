import { getContext } from '../../../common/utils/getContext.js';
import { logger } from '../../../common/utils/logger/logger.js';

type PrepareUpdateQueryProps = {
  id: string;
  index: string;
  query: Record<string, any>;
};

export async function prepareUpdateQuery(props: PrepareUpdateQueryProps) {
  try {
    const { id, index, query } = props;

    const context = getContext();

    if (!context) throw new Error('No context found!');

    const { url, flags } = context;
    const queryAsStr = JSON.stringify(query);

    const requestString = `curl -X POST "${url}/${index}/_update/${id}?pretty" ${flags} -d' ${queryAsStr}'`;

    return requestString;
  } catch (error) {
    console.error(error);
    logger.error('[ES Error] Failed to execute soft update query...');

    throw error;
  }
}
