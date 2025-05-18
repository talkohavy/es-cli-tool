import { getContext } from '../../../common/utils/getContext.js';
import { logger } from '../../../common/utils/logger/logger.js';

type PrepareHardUpdateQueryProps = {
  id: string;
  index: string;
  query: Record<string, any>;
};

export async function prepareHardUpdateQuery(props: PrepareHardUpdateQueryProps) {
  try {
    const { id, index, query } = props;

    const context = getContext();

    if (!context) throw new Error('No context found!');

    const { url, flags } = context;
    const queryAsStr = JSON.stringify(query);

    const requestString = `curl -X PUT "${url}/${index}/_doc/${id}?pretty" ${flags} -d' ${queryAsStr}'`;

    return requestString;
  } catch (error) {
    console.error(error);
    logger.error('[ES Error] Failed to prepare an execute hard update query...');

    throw error;
  }
}
