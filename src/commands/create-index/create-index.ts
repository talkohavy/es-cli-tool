import { colorizeJson } from '../../utils/colorize-json/colorize-json.js';
import { logger } from '../../utils/logger/logger.js';
import { executeCreateIndexQuery } from './helpers/executeCreateIndexQuery.js';
import { inquireNewIndexName } from './helpers/inquireNewIndexName.js';
import { validateElasticsearchIndexName } from './helpers/validateIndexName.js';

export const createIndexCommandString = 'create-index';
export const createIndexDescription = 'Create a new index';

export async function createIndex() {
  const selectedIndex = await inquireNewIndexName();

  const { isValid, reason } = validateElasticsearchIndexName(selectedIndex);
  if (!isValid) {
    logger.error(`Invalid index name: ${reason!}`);

    return;
  }

  const response = await executeCreateIndexQuery(selectedIndex);

  const colorizedResponse = colorizeJson(response);

  console.log(colorizedResponse);
}
