import { COLORS } from '../../common/constants/colors.js';
import { getAllIndexesNames } from '../../common/utils/getAllIndexesNames.js';
import { logger } from '../../common/utils/logger/logger.js';

export const indexListCommandString = 'index-list';
export const indexListDescription = 'List all available indexes.';

export async function indexList() {
  const indexNamesArr = await getAllIndexesNames();

  if (!indexNamesArr.length) {
    logger.info(`${COLORS.green}No indexes found. Create one first?${COLORS.stop}`, {
      newLineBefore: true,
      newLineAfter: true,
    });

    return;
  }

  logger.info(`${COLORS.green}Available indexes:${COLORS.stop}`, { newLineBefore: true });

  indexNamesArr.forEach((indexName) => {
    logger.info(`- ${indexName}`);
  });

  console.log('');
}
