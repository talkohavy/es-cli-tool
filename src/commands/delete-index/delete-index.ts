import { Argv } from 'yargs';
import { COLORS } from '../../common/constants/colors.js';
import { colorizeJson } from '../../common/utils/colorize-json/colorize-json.js';
import { getAllIndexesNames } from '../../common/utils/getAllIndexesNames.js';
import { inquireConfirm } from '../../common/utils/inquires/inquireConfirm.js';
import { inquireSelectFromList } from '../../common/utils/inquires/inquireSelectFromList.js';
import { logger } from '../../common/utils/logger/logger.js';
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
  yargs
    .option('sure', {
      alias: 'y',
      type: 'boolean',
      description: 'auto-pass the "are you sure" inquire.',
    })
    .example('es-cli-tool delete-index --sure', 'Deletes the users index without user confirmation.');
};

type DeleteIndexProps = {
  index: string;
  sure: boolean;
  color: boolean;
};

export async function deleteIndex(props: DeleteIndexProps) {
  const { index, sure: isSure, color: shouldColorize } = props;

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

  const shouldDelete = isSure ?? (await inquireConfirm({ message: 'Are you sure?' }));

  if (!shouldDelete) return;

  const responseRaw = await executeDeleteIndexQuery(selectedIndex);

  const response = shouldColorize ? colorizeJson(responseRaw) : responseRaw;

  console.log(response);
}
