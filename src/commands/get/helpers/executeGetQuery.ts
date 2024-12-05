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
      `curl --silent --cacert ~/http_ca.crt -u elastic:$ELASTIC_PASSWORD -X GET "https://localhost:9200/${index}/_search" -H 'Content-Type: application/json' -d'
${JSON.stringify(query)}'`,
    ).toString();

    return result;
  } catch (error) {
    console.error(error);
    logger.error('[ES Error] Failed to execute GET query...');

    throw error;
  }
}
