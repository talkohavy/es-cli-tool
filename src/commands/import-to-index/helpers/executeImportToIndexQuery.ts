import { execSync } from 'child_process';
import { logger } from '../../../utils/logger/logger.js';

type ExecuteImportToIndexQueryProps = {
  index: string;
  file: string;
};

export async function executeImportToIndexQuery(props: ExecuteImportToIndexQueryProps) {
  try {
    const { index, file } = props;

    const result = execSync(
      `curl --insecure --silent -u elastic:$ELASTIC_PASSWORD -X POST "https://localhost:9200/${index}/_bulk?pretty" -H "Content-Type: application/json" --data-binary "@${file}"`,
    ).toString();

    return result;
  } catch (error) {
    console.error(error);
    logger.error(`[ES Error] Failed to populate index ${props.index}...`);

    throw error;
  }
}
