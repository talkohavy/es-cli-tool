import { COLORS } from '../../constants/colors.js';
import { getAllIndexesNames } from '../../utils/getAllIndexesNames.js';
import { inquireIndexName } from '../../utils/inquires/inquireIndexName.js';
import { logger } from '../../utils/logger/logger.js';
import { executeGetMapping } from './helpers/executeGetMapping.js';

export async function getMapping() {
  try {
    const indexNamesArr = await getAllIndexesNames();

    if (!indexNamesArr.length) {
      logger.info(`${COLORS.green}No indexes found. Create one first?${COLORS.stop}`);

      return;
    }

    const selectedIndex = await inquireIndexName(indexNamesArr);

    const response = await executeGetMapping(selectedIndex);

    console.log(COLORS.blue, response, COLORS.stop);
  } catch (_error: any) {
    _error;
  }
}
