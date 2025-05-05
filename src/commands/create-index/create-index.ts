import { Argv } from 'yargs';
import { colorizeJson } from '../../common/utils/colorize-json/colorize-json.js';
import { logger } from '../../common/utils/logger/logger.js';
import { executeCreateIndexQuery } from './helpers/executeCreateIndexQuery.js';
import { inquireNewIndexName } from './helpers/inquireNewIndexName.js';
import { validateElasticsearchIndexName } from './helpers/validateIndexName.js';

export const createIndexCommandString = 'create-index';
export const createIndexDescription = 'Create a new index.';

export const createIndexBuilder: any = (yargs: Argv) => {
  yargs
    .option('index', {
      type: 'string',
      description: 'Specify the index to create.',
    })
    .example('es-cli-tool create-index --index users', 'Creates a new index named users.');
};

type CreateIndexProps = {
  index: string;
};

export async function createIndex(props: CreateIndexProps) {
  const { index } = props;

  const selectedIndex = index ?? (await inquireNewIndexName());

  const { isValid, reason } = validateElasticsearchIndexName(selectedIndex);
  if (!isValid) {
    logger.error(`Invalid index name: ${reason!}`);

    return;
  }

  const response = await executeCreateIndexQuery(selectedIndex);

  const colorizedResponse = colorizeJson(response);

  console.log(colorizedResponse);
}
