import os from 'os';
import { COLORS } from '../../constants/colors.js';
import { beautifyJson } from '../../utils/beautifyJson.js';
import { logger } from '../../utils/logger/logger.js';
import { executeCreateIndexQuery } from './helpers/executeCreateIndexQuery.js';
import { inquireNewIndexName } from './helpers/inquireNewIndexName.js';
import { validateElasticsearchIndexName } from './helpers/vallidateIndexName.js';

export async function createIndex() {
  try {
    const selectedIndex = await inquireNewIndexName();

    const { isValid, reason } = validateElasticsearchIndexName(selectedIndex);
    if (!isValid) {
      logger.error(`Invalid index name: ${reason!}`);

      return;
    }

    const response = await executeCreateIndexQuery(selectedIndex);

    const beautifulResponse = beautifyJson(response);

    console.log(COLORS.blue, beautifulResponse, COLORS.stop);
  } catch (_error: any) {
    console.log(`${os.EOL}${COLORS.red}Bye.${COLORS.stop}${os.EOL}`);
  }
}
