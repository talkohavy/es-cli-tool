import { Argv } from 'yargs';
import { COLORS } from '../../common/constants/colors.js';
import { colorizeJson } from '../../common/utils/colorize-json/colorize-json.js';
import { getAllIndexesNames } from '../../common/utils/getAllIndexesNames.js';
import { getElasticQuery } from '../../common/utils/getElasticQuery.js';
import { inquireSelectFromList } from '../../common/utils/inquires/inquireSelectFromList.js';
import { logger } from '../../common/utils/logger/logger.js';
import { executeGetQuery } from './helpers/executeGetQuery.js';

enum SubCommands {
  All = 'all',
}

export const getDescription = 'Get documents from a certain index by a certain query.';
export const getCommandString = 'get';

export const getBuilder: any = (yargs: Argv) => {
  yargs.command(
    'all [count]',
    'Matches all items on a certain index, and returns X of them. Provide <count> to control how many are returned. Defaults to 10.',
    (yargs: Argv) => {
      yargs.positional('count', {
        describe: 'Number of items to return',
        type: 'number',
        default: 10,
      });
    },
  );

  yargs
    .option('index', {
      type: 'string',
      description: 'Specify the target index.',
    })
    .example('es-cli-tool get --index users', 'Executes a GET query on the users index.');
  yargs
    .option('file', {
      type: 'string',
      alias: 'f',
      description: 'Use a file as the query to execute.',
    })
    .example('es-cli-tool get --file query.json', 'Executes the query in that file.');
};

type GetProps = {
  commands: Array<string>;
  index: string;
  file: string;
  color: boolean;
  count: number;
};

export async function get(props: GetProps) {
  const { commands, index, file, color: shouldColorize, count } = props;
  const subCommand = commands[1] as SubCommands;

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

  const elasticQuery = subCommand === SubCommands.All ? getMatchAllQuery(count) : await getElasticQuery(file);

  if (!elasticQuery) return;

  const responseRaw = await executeGetQuery({ index: selectedIndex, query: elasticQuery });

  const response = shouldColorize ? colorizeJson(responseRaw) : responseRaw;

  console.log(response);
}

function getMatchAllQuery(count: number): Record<string, any> {
  return {
    size: count,
    query: {
      match_all: {},
    },
  };
}
