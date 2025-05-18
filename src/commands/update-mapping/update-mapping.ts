import { Argv } from 'yargs';
import { COLORS } from '../../common/constants/colors.js';
import { colorizeJson } from '../../common/utils/colorize-json/colorize-json.js';
import { getAllIndexesNames } from '../../common/utils/getAllIndexesNames.js';
import { getElasticQuery } from '../../common/utils/getElasticQuery.js';
import { inquireSelectFromList } from '../../common/utils/inquires/inquireSelectFromList.js';
import { logger } from '../../common/utils/logger/logger.js';
import { executeUpdateMappingQuery } from './helpers/executeUpdateMappingQuery.js';
import { prepareUpdateMappingQuery } from './helpers/prepareUpdateMappingQuery.js';

export const updateMappingCommandString = 'update-mapping';
export const updateMappingDescription = "Update an index's mapping.";

export const updateMappingBuilder: any = (yargs: Argv) => {
  yargs
    .option('index', {
      type: 'string',
      description: 'Specify the target index.',
    })
    .example('es-cli-tool update-mapping --index users', 'Executes a GET query on the users index.');
  yargs
    .option('file', {
      type: 'string',
      alias: 'f',
      description: 'Use a file as the query to execute.',
    })
    .example('es-cli-tool update-mapping --file mapping.json', 'Executes the query in that file.');
};

type UpdateMappingProps = {
  file: string;
  index: string;
  curl: boolean;
};

export async function updateMapping(props: UpdateMappingProps) {
  const { index, file, curl: shouldGetCurl } = props;

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

  const preparedQuery = await prepareUpdateMappingQuery({ index: selectedIndex, query: elasticQuery });

  if (shouldGetCurl) {
    return console.log('\n', preparedQuery, '\n');
  }

  const response = await executeUpdateMappingQuery(preparedQuery);

  const colorizedResponse = colorizeJson(response);

  console.log(colorizedResponse);
}
