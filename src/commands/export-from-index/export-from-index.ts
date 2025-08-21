import { Argv } from 'yargs';
import { COLORS } from '../../common/constants/colors.js';
import { getAllIndexesNames } from '../../common/utils/getAllIndexesNames.js';
import { inquireSelectFromList } from '../../common/utils/inquires/inquireSelectFromList.js';
import { logger } from '../../lib/logger/logger.js';
import { executeExportToFileQuery } from './helpers/executeExportToFileQuery.js';

const ALL_INDEXES = 'all';

export const exportFromIndexCommandString = 'export';
export const exportFromIndexDescription = 'Export data from an index to a file.';

export const exportFromIndexBuilder: any = (yargs: Argv) => {
  yargs
    .option('index', {
      type: 'string',
      description: 'Specify the target index.',
    })
    .example('es-cli-tool export --index users', 'Exports from the users index.');
};

type ExportFromIndexProps = {
  index?: string;
};

export async function exportFromIndex(props: ExportFromIndexProps) {
  const { index } = props;

  const indexNamesArr = await getAllIndexesNames();

  if (!indexNamesArr.length) {
    logger.info(`${COLORS.green}No indexes found. Create one first?${COLORS.stop}`, {
      newLineBefore: true,
      newLineAfter: true,
    });

    return;
  }

  const selectedIndex = index ?? (await inquireSelectFromList(indexNamesArr, 'index'));

  if (!indexNamesArr.includes(selectedIndex) && selectedIndex !== ALL_INDEXES) {
    logger.info(`${COLORS.green}index ${index} doesn't exist...${COLORS.stop}`);

    return;
  }

  const indexesToExport = selectedIndex === ALL_INDEXES ? indexNamesArr : [selectedIndex];

  for (const index of indexesToExport) {
    logger.info(`${COLORS.green}Exporting data from index: ${index}${COLORS.stop}`);

    await executeExportToFileQuery({ index, file: `${index}.json` });
  }

  logger.info(`${COLORS.green}Data exported successfully.${COLORS.stop}`);
}
