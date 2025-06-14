import { Argv } from 'yargs';
import { COLORS } from '../../common/constants/colors.js';
import { colorizeJson } from '../../common/utils/colorize-json/colorize-json.js';
import { getAllIndexesNames } from '../../common/utils/getAllIndexesNames.js';
import { getElasticQuery } from '../../common/utils/getElasticQuery.js';
import { inquireSelectFromList } from '../../common/utils/inquires/inquireSelectFromList.js';
import { logger } from '../../common/utils/logger/logger.js';
import { executeAddQuery } from './helpers/executeAddQuery.js';
import { prepareAddQuery } from './helpers/prepareAddQuery.js';

export const addCommandString = 'add';
export const addDescription = 'Insert a new document to index.';

export const addBuilder: any = (yargs: Argv) => {
  yargs
    .option('index', {
      type: 'string',
      description: 'Specify the target index.',
    })
    .example('es-cli-tool add --index users', 'Executes an INSERT query on the users index.');
  yargs
    .option('file', {
      type: 'string',
      alias: 'f',
      description: 'Use a file as the query to execute.',
    })
    .example('es-cli-tool add --file query.json', 'Executes the query in that file.');
};

// If you're gonna use emojis, use one of these:
// 🎩👑🌺⭐️✨❄️🥗🏆🎗️🥇🚀💎💊🔑🎁🎀✏️🔍🔓🛑❌✅💯❌🟢🟡🟠🔴🔵

type AddProps = {
  file: string;
  index: string;
  color: boolean;
  curl: boolean;
};

export async function add(props: AddProps) {
  const { index, file, color: shouldColorize, curl: shouldGetCurl } = props;

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

  const preparedQuery = await prepareAddQuery({ index: selectedIndex, query: elasticQuery });

  if (shouldGetCurl) {
    return console.log('\n', preparedQuery, '\n');
  }

  const responseRaw = await executeAddQuery(preparedQuery);

  const response = shouldColorize ? colorizeJson(responseRaw) : responseRaw;

  console.log(response);
}
