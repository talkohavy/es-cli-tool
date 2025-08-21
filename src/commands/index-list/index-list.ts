import { COLORS } from '../../common/constants/colors.js';
import { getAllIndexesNames } from '../../common/utils/getAllIndexesNames.js';
import { logger } from '../../lib/logger/logger.js';
import { prepareGetAllIndexesNamesQuery } from '../../common/utils/prepareGetAllIndexesNamesQuery.js';

export const indexListCommandString = 'index-list';
export const indexListDescription = 'List all available indexes.';

type IndexListProps = {
  curl: boolean;
};

export async function indexList(props: IndexListProps) {
  const { curl: shouldGetCurl } = props;

  const preparedQuery = prepareGetAllIndexesNamesQuery();

  if (shouldGetCurl) {
    return console.log('\n', preparedQuery, '\n');
  }

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
