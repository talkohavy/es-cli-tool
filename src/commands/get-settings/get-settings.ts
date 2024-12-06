import { COLORS } from '../../constants/colors.js';
import { getAllIndexesNames } from '../../utils/getAllIndexesNames.js';
import { inquireIndexName } from '../../utils/inquires/inquireIndexName.js';
import { logger } from '../../utils/logger/logger.js';
import { executeGetSettings } from './helpers/executeGetSettings.js';

export async function getSettings() {
  try {
    const indexNamesArr = await getAllIndexesNames();

    if (!indexNamesArr.length) {
      logger.info(`${COLORS.green}No indexes found. Create one first?${COLORS.stop}`);

      return;
    }

    const selectedIndex = await inquireIndexName(indexNamesArr);

    const response = await executeGetSettings(selectedIndex);

    console.log(COLORS.blue, response, COLORS.stop);
  } catch (_error: any) {
    _error;
  }
}
