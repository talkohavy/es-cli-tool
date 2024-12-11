import { Argv } from 'yargs';
import { COLORS } from '../../constants/colors.js';
import { EditorTypes } from '../../constants/types.js';
import { colorizeJson } from '../../utils/colorize-json/colorize-json.js';
import { getAllIndexesNames } from '../../utils/getAllIndexesNames.js';
import { getElasticQuery } from '../../utils/getElasticQuery.js';
import { inquireSelectFromList } from '../../utils/inquires/inquireSelectFromList.js';
import { logger } from '../../utils/logger/logger.js';
import { validateAndTransformQuery } from '../../utils/validateAndTransformQuery.js';
import { executeGetQuery } from './helpers/executeGetQuery.js';

export const getCommandString = 'get';
export const getDescription = 'Get document/s by query';

export const getBuilder: any = (yargs: Argv) => {
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
  yargs
    .option('editor', {
      type: 'string',
      choices: [EditorTypes.Vi, EditorTypes.Vim, EditorTypes.Nano, EditorTypes.Code] as Array<EditorTypes>,
      description: 'Choose the external editor for editing your query.',
    })
    .example(
      'es-cli-tool get --editor vim',
      'Would open up vim as editor when you hit enter on the insert message prompt.',
    );
};

type GetProps = {
  file: string;
  index: string;
  color: boolean;
};

export async function get(props: GetProps) {
  const { index, file, color: shouldColorize } = props;

  const indexNamesArr = await getAllIndexesNames();

  if (!indexNamesArr.length) {
    logger.info(`${COLORS.green}No indexes found. Create one first?${COLORS.stop}`);

    return;
  }

  const selectedIndex = index ?? (await inquireSelectFromList(indexNamesArr, 'index'));

  if (!indexNamesArr.includes(selectedIndex)) {
    logger.info(`${COLORS.green}index ${index} doesn't exist...${COLORS.stop}`);

    return;
  }

  const elasticQueryStr = await getElasticQuery(file);

  if (!elasticQueryStr) return;

  const elasticQuery = await validateAndTransformQuery(elasticQueryStr);

  const responseRaw = await executeGetQuery({ index: selectedIndex, query: elasticQuery });

  const response = shouldColorize ? colorizeJson(responseRaw) : responseRaw;

  console.log(response);
}
