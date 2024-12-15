import { execSync } from 'child_process';
import { getContext } from '../../../common/utils/getContext.js';
import { logger } from '../../../common/utils/logger/logger.js';

type ExecuteImportToIndexQueryProps = {
  index: string;
  file: string;
};

export async function executeImportToIndexQuery(props: ExecuteImportToIndexQueryProps) {
  try {
    const { index, file } = props;

    const context = getContext();

    if (!context) throw new Error('No context found!');

    const { url, flags } = context;

    const requestString = `curl -X POST "${url}/${index}/_bulk?pretty" ${flags} --data-binary "@${file}"`;

    const result = execSync(requestString).toString();

    return result;
  } catch (error) {
    console.error(error);
    logger.error(`[ES Error] Failed to populate index ${props.index}...`);

    throw error;
  }
}
