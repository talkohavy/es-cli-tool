import { execSync } from 'child_process';
import { logger } from '../../../utils/logger/logger.js';

type ExecuteAddQueryProps = {
  index: string;
  documentId: string;
};

export async function executeDeleteQuery(props: ExecuteAddQueryProps) {
  try {
    const { index, documentId } = props;

    const result = execSync(
      `curl --insecure -u elastic:$ELASTIC_PASSWORD -X DELETE "https://localhost:9200/${index}/_doc/${documentId}"`,
    ).toString();

    return result;
  } catch (error) {
    console.error(error);
    logger.error(`[ES Error] Failed to delete document with id of ${props.documentId} from index ${props.index}...`);

    throw error;
  }
}
