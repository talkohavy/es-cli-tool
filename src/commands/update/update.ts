import { Argv } from 'yargs';
import { COLORS } from '../../common/constants/colors.js';
import { colorizeJson } from '../../common/utils/colorize-json/colorize-json.js';
import { getAllIndexesNames } from '../../common/utils/getAllIndexesNames.js';
import { getElasticQuery } from '../../common/utils/getElasticQuery.js';
import { inquireSelectFromList } from '../../common/utils/inquires/inquireSelectFromList.js';
import { logger } from '../../common/utils/logger/logger.js';
import { executeUpdateQuery } from './helpers/executeUpdateQuery.js';
import { prepareUpdateQuery } from './helpers/prepareUpdateQuery.js';

export const updateCommandString = 'update';
export const updateDescription = 'Update an existing document in an index by id.';

export const updateBuilder: any = (yargs: Argv) => {
  yargs
    .option('index', {
      type: 'string',
      description: 'Specify the target index.',
    })
    .example('es-cli-tool update --index users --id 123', 'Executes an UPDATE query on the users index.');
  yargs
    .option('id', {
      type: 'string',
      description: 'Specify the id of the document to update.',
      demandOption: true,
    })
    .example('es-cli-tool update --index users --id 123', 'Update the document with id of 123 inside the users index.');
  yargs
    .option('file', {
      type: 'string',
      alias: 'f',
      description: 'Use a file as the query to execute.',
    })
    .example('es-cli-tool update --id 123 --file query.json', 'Executes the update query in that file.');
};

type UpdateProps = {
  id: string;
  index: string;
  file: string;
  color: boolean;
  curl: boolean;
};

export async function update(props: UpdateProps) {
  const { id, index, file, color: shouldColorize, curl: shouldGetCurl } = props;

  const indexNamesArr = await getAllIndexesNames();

  if (!indexNamesArr.length) {
    logger.info(`${COLORS.green}No indexes found. Create one first?${COLORS.stop}`, {
      newLineBefore: true,
      newLineAfter: true,
    });

    return;
  }

  const selectedIndex = index ?? (await inquireSelectFromList(indexNamesArr, 'index'));

  if (!indexNamesArr.includes(selectedIndex)) {
    logger.info(`${COLORS.green}index ${index} doesn't exist...${COLORS.stop}`);

    return;
  }

  const elasticQuery = await getElasticQuery(file);

  if (!elasticQuery) return;

  const preparedQuery = await prepareUpdateQuery({ index: selectedIndex, id, query: elasticQuery });

  if (shouldGetCurl) {
    return console.log('\n', preparedQuery, '\n');
  }

  const responseRaw = await executeUpdateQuery(preparedQuery);

  const response = shouldColorize ? colorizeJson(responseRaw) : responseRaw;

  console.log(response);
}
