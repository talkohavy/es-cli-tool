import { execSync } from 'child_process';
import { getContext } from '../../../utils/getContext.js';
import { logger } from '../../../utils/logger/logger.js';

type ExecuteAddQueryProps = {
  index: string;
  documentId: string;
};

export async function executeDeleteQuery(props: ExecuteAddQueryProps) {
  try {
    const { index, documentId } = props;

    const context = getContext();

    if (!context) throw new Error('No context found!');

    const { url, flags } = context;

    const requestString = `curl -X DELETE "${url}/${index}/_doc/${documentId}?pretty" ${flags}`;

    const result = execSync(requestString).toString();

    return result;
  } catch (error) {
    console.error(error);
    logger.error(`[ES Error] Failed to delete document with id of ${props.documentId} from index ${props.index}...`);

    throw error;
  }
}
