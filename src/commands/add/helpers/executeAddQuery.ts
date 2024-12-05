import { execSync } from 'child_process';
import { logger } from '../../../utils/logger/logger.js';

type ExecuteAddQueryProps = {
  index: string;
  query: Record<string, any>;
};

export async function executeAddQuery(props: ExecuteAddQueryProps) {
  try {
    const { index, query } = props;

    const result = execSync(
      `curl --insecure --silent -u elastic:$ELASTIC_PASSWORD -X POST "https://localhost:9200/${index}/_doc/" -H 'Content-Type: application/json' -d'
${JSON.stringify(query)}'`,
    ).toString();

    return result;
  } catch (error) {
    console.error(error);
    logger.error('[ES Error] Failed to execute POST query...');

    throw error;
  }
}
