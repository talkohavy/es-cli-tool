import { Argv } from 'yargs';
import { COLORS } from '../../common/constants/colors.js';
import { colorizeJson } from '../../common/utils/colorize-json/colorize-json.js';
import { getAllIndexesNames } from '../../common/utils/getAllIndexesNames.js';
import { inquireSelectFromList } from '../../common/utils/inquires/inquireSelectFromList.js';
import { logger } from '../../common/utils/logger/logger.js';
import { executeImportToIndexQuery } from './helpers/executeImportToIndexQuery.js';

export const importToIndexCommandString = 'import';
export const importToIndexDescription = 'Import data from a file into an index.';

export const importToIndexBuilder: any = (yargs: Argv) => {
  yargs
    .option('index', {
      type: 'string',
      description: 'Specify the target index.',
    })
    .example('es-cli-tool import --index users', 'Imports into the users users index.');
  yargs
    .option('file', {
      type: 'string',
      alias: 'f',
      demandOption: true,
      description: 'Use this file to import data from.',
    })
    .example('es-cli-tool import --file data.json', 'Imports data to an index from data.json file.');
};

type ImportToIndexProps = {
  index: string;
  file: string;
};

export async function importToIndex(props: ImportToIndexProps) {
  const { index, file } = props;

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

  if (!file) {
    logger.info(`${COLORS.green}You MUST enter a correct path to file...${COLORS.stop}`);

    return;
  }

  const response = await executeImportToIndexQuery({ index: selectedIndex, file });

  const colorizedResponse = colorizeJson(response);

  console.log(colorizedResponse);
}
