import { getContext } from '../../../common/utils/getContext.js';
import { logger } from '../../../common/utils/logger/logger.js';

type PrepareGetQueryProps = {
  index: string;
  query: Record<string, any>;
};

export async function prepareGetQuery(props: PrepareGetQueryProps) {
  try {
    const { index, query } = props;

    const context = getContext();

    if (!context) throw new Error('No context found!');

    const { url, flags } = context;
    const queryAsStr = JSON.stringify(query);

    const requestString = `curl -X POST "${url}/${index}/_search?pretty" ${flags} -d' ${queryAsStr}'`;

    return requestString;
  } catch (error) {
    console.error(error);
    logger.error('[ES Error] Failed to prepare query...');

    throw error;
  }
}
