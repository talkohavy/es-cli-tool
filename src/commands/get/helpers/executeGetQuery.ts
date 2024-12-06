import { execSync } from 'child_process';
import { logger } from '../../../utils/logger/logger.js';

type ExecuteAddQueryProps = {
  index: string;
  query: Record<string, any>;
};

export async function executeGetQuery(props: ExecuteAddQueryProps) {
  try {
    const { index, query } = props;

    const result = execSync(
      `curl --insecure --silent -u elastic:$ELASTIC_PASSWORD -X GET "https://localhost:9200/${index}/_search?pretty" -H 'Content-Type: application/json' -d'
${JSON.stringify(query)}'`,
    ).toString();

    return result;
  } catch (error) {
    console.error(error);
    logger.error('[ES Error] Failed to execute GET query...');

    throw error;
  }
}
