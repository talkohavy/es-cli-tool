import { getContext } from '../../../common/utils/getContext.js';
import { logger } from '../../../lib/logger/logger.js';

type PrepareAddQueryProps = {
  index: string;
  documentId: string;
};

export async function prepareDeleteQuery(props: PrepareAddQueryProps) {
  try {
    const { index, documentId } = props;

    const context = getContext();

    if (!context) throw new Error('No context found!');

    const { url, flags } = context;

    const requestString = `curl -X DELETE "${url}/${index}/_doc/${documentId}?pretty" ${flags}`;

    return requestString;
  } catch (error) {
    console.error(error);
    logger.error(
      `[ES Error] Failed to prepare the delete document query for document with id of ${props.documentId} from index ${props.index}...`,
    );

    throw error;
  }
}
