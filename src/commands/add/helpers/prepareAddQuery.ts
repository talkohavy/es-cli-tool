import { getContext } from '../../../common/utils/getContext.js';
import { logger } from '../../../lib/logger/logger.js';

type PrepareAddQueryProps = {
  index: string;
  query: Record<string, any>;
};

export async function prepareAddQuery(props: PrepareAddQueryProps) {
  try {
    const { index, query } = props;

    const context = getContext();

    if (!context) throw new Error('No context found!');

    const { url, flags } = context;
    const queryAsStr = JSON.stringify(query);

    const requestString = `curl -X POST "${url}/${index}/_doc?pretty" ${flags} -d' ${queryAsStr}'`;

    return requestString;
  } catch (error) {
    console.error(error);
    logger.error('[ES Error] Failed to prepare POST query...');

    throw error;
  }
}
