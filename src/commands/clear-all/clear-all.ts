import { COLORS } from '../../common/constants/colors.js';
import { getAllIndexesNames } from '../../common/utils/getAllIndexesNames.js';
import { inquireConfirm } from '../../common/utils/inquires/inquireConfirm.js';
import { logger } from '../../lib/logger/logger.js';
import { executeDeleteIndexQuery } from '../delete-index/helpers/executeDeleteIndexQuery.js';
import { prepareDeleteIndexQuery } from '../delete-index/helpers/prepareDeleteIndexQuery.js';

export const clearAllCommandString = 'clear-all';
export const clearAllDescription = 'Deletes the cluster. This will delete all your indexes.';

type ClearAllProps = {
  curl: boolean;
};

export async function clearAll(props: ClearAllProps) {
  const { curl: shouldGetCurl } = props;

  console.log('');

  const answer = await inquireConfirm({
    message: `Are you sure? ${COLORS.red}(this will delete ALL your indexes!)${COLORS.stop}`,
  });

  if (answer === false) return;

  const indexNamesArr = await getAllIndexesNames();

  if (!indexNamesArr.length) {
    logger.info(`${COLORS.green}No indexes found. Nothing deleted.${COLORS.stop}`, {
      newLineBefore: true,
      newLineAfter: true,
    });

    return;
  }

  indexNamesArr.forEach((indexName) => {
    const preparedQuery = prepareDeleteIndexQuery(indexName);

    if (shouldGetCurl) {
      return console.log('\n', preparedQuery, '\n');
    }

    executeDeleteIndexQuery(preparedQuery);
  });

  if (shouldGetCurl) return;

  const summaryMessage = `${indexNamesArr.length} indexes deleted successfully!`;

  logger.info(`${COLORS.blue}${summaryMessage}${COLORS.stop}`, {
    newLineBefore: true,
    newLineAfter: true,
  });
}
