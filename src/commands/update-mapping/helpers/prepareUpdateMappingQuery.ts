import { getContext } from '../../../common/utils/getContext.js';
import { logger } from '../../../lib/logger/logger.js';

type PrepareUpdateMappingQueryProps = {
  index: string;
  query: Record<string, any>;
};

export async function prepareUpdateMappingQuery(props: PrepareUpdateMappingQueryProps) {
  try {
    const { index, query } = props;

    const context = getContext();

    if (!context) throw new Error('No context found!');

    const { url, flags } = context;
    const queryAsStr = JSON.stringify(query);

    const requestString = `curl -X PUT "${url}/${index}/_mapping?pretty" ${flags} -d' ${queryAsStr}'`;

    return requestString;
  } catch (error) {
    console.error(error);
    logger.error('[ES Error] Failed to prepare an update mapping query...');

    throw error;
  }
}
