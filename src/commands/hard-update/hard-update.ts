import { Argv } from 'yargs';
import { COLORS } from '../../constants/colors.js';
import { colorizeJson } from '../../utils/colorize-json/colorize-json.js';
import { getAllIndexesNames } from '../../utils/getAllIndexesNames.js';
import { getElasticQuery } from '../../utils/getElasticQuery.js';
import { inquireSelectFromList } from '../../utils/inquires/inquireSelectFromList.js';
import { logger } from '../../utils/logger/logger.js';
import { executeHardUpdateQuery } from './helpers/executeHardUpdateQuery.js';

export const hardUpdateCommandString = 'hard-update';
export const hardUpdateDescription = 'Overwrite an existing document in an index by id';

export const hardUpdateBuilder: any = (yargs: Argv) => {
  yargs
    .option('index', {
      type: 'string',
      description: 'Specify the target index.',
    })
    .example('es-cli-tool hard-update --index users --id 123', 'Executes an UPDATE query on the users index.');
  yargs
    .option('id', {
      type: 'string',
      description: 'Specify the id of the document to update.',
      demandOption: true,
    })
    .example(
      'es-cli-tool hard-update --index users --id 123',
      'Update the document with id of 123 inside the users index.',
    );
  yargs
    .option('file', {
      type: 'string',
      alias: 'f',
      description: 'Use a file as the query to execute.',
    })
    .example('es-cli-tool hard-update --id 123 --file query.json', 'Executes the query in that file.');
};

type UpdateProps = {
  id: string;
  index: string;
  file: string;
  color: boolean;
};

export async function update(props: UpdateProps) {
  const { id, index, file, color: shouldColorize } = props;

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

  const responseRaw = await executeHardUpdateQuery({ index: selectedIndex, id, query: elasticQuery });

  const response = shouldColorize ? colorizeJson(responseRaw) : responseRaw;

  console.log(response);
}
