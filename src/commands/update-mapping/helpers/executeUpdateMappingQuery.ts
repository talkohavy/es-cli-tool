import { execSync } from 'child_process';
import { logger } from '../../../utils/logger/logger.js';

type ExecuteUpdateMappingQueryProps = {
  index: string;
  query: Record<string, any>;
};

export async function executeUpdateMappingQuery(props: ExecuteUpdateMappingQueryProps) {
  try {
    const { index, query } = props;

    const result = execSync(
      `curl --insecure --silent -u elastic:$ELASTIC_PASSWORD -X PUT 'https://localhost:9200/${index}/_mapping?pretty' -H 'Content-Type: application/json' -d'
${JSON.stringify(query)}'`,
    ).toString();

    return result;
  } catch (error) {
    console.error(error);
    logger.error('[ES Error] Failed to execute an update on mapping...');

    throw error;
  }
}
