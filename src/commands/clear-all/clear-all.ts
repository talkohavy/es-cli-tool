import { COLORS } from '../../constants/colors.js';
import { getAllIndexesNames } from '../../utils/getAllIndexesNames.js';
import { inquireConfirm } from '../../utils/inquires/inquireConfirm.js';
import { logger } from '../../utils/logger/logger.js';
import { executeDeleteIndexQuery } from '../delete-index/helpers/executeDeleteIndexQuery.js';

export async function clearAll() {
  try {
    const answer = await inquireConfirm(
      `Are you sure? ${COLORS.red}(this will delete ALL your indexes!)${COLORS.stop}`,
    );

    if (answer === false) return;

    const indexNamesArr = await getAllIndexesNames();

    if (!indexNamesArr.length) {
      logger.info(`${COLORS.green}No indexes found. Nothing deleted.${COLORS.stop}`);

      return;
    }

    indexNamesArr.forEach(executeDeleteIndexQuery);

    const summaryMessage = `${indexNamesArr.length} indexes deleted successfully!`;

    console.log(COLORS.blue, summaryMessage, COLORS.stop);
  } catch (_error: any) {
    _error;
  }
}
