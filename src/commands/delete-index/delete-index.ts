import { Argv } from 'yargs';
import { COLORS } from '../../constants/colors.js';
import { colorizeJson } from '../../utils/colorize-json/colorize-json.js';
import { getAllIndexesNames } from '../../utils/getAllIndexesNames.js';
import { inquireSelectFromList } from '../../utils/inquires/inquireSelectFromList.js';
import { logger } from '../../utils/logger/logger.js';
import { executeDeleteIndexQuery } from './helpers/executeDeleteIndexQuery.js';

export const deleteIndexCommandString = 'delete-index';
export const deleteIndexDescription = 'Delete an existing index.';

export const deleteIndexBuilder: any = (yargs: Argv) => {
  yargs
    .option('index', {
      type: 'string',
      description: 'Specify the target index.',
    })
    .example('es-cli-tool delete-index --index users', 'Deletes the users index.');
};

type DeleteIndexProps = {
  index: string;
  color: boolean;
};

export async function deleteIndex(props: DeleteIndexProps) {
  const { index, color: shouldColorize } = props;

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

  const responseRaw = await executeDeleteIndexQuery(selectedIndex);

  const response = shouldColorize ? colorizeJson(responseRaw) : responseRaw;

  console.log(response);
}
