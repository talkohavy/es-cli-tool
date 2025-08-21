import { Argv } from 'yargs';
import { COLORS } from '../../common/constants/colors.js';
import { colorizeJson } from '../../common/utils/colorize-json/colorize-json.js';
import { getAllIndexesNames } from '../../common/utils/getAllIndexesNames.js';
import { inquireSelectFromList } from '../../common/utils/inquires/inquireSelectFromList.js';
import { logger } from '../../lib/logger/logger.js';
import { executeGetMapping } from './helpers/executeGetMapping.js';
import { prepareGetMapping } from './helpers/prepareGetMapping.js';

export const getMappingCommandString = 'get-mapping';
export const getMappingDescription = "Get an index's mapping.";

export const getMappingBuilder: any = (yargs: Argv) => {
  yargs
    .option('index', {
      type: 'string',
      description: 'Specify the target index.',
    })
    .example('es-cli-tool get-mapping --index users', 'Fetches the mapping for the users index.');
};

type GetMappingProps = {
  index: string;
  color: boolean;
  curl: boolean;
};

export async function getMapping(props: GetMappingProps) {
  const { index, color: shouldColorize, curl: shouldGetCurl } = props;

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

  const preparedQuery = await prepareGetMapping(selectedIndex);

  if (shouldGetCurl) {
    return console.log('\n', preparedQuery, '\n');
  }

  const responseRaw = await executeGetMapping(preparedQuery);

  const response = shouldColorize ? colorizeJson(responseRaw) : responseRaw;

  console.log(response);
}
