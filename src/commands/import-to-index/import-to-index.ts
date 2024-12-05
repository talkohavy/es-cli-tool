import { COLORS } from '../../constants/colors.js';
import { beautifyJson } from '../../utils/beautifyJson.js';
import { getAllIndexesNames } from '../../utils/getAllIndexesNames.js';
import { inquireIndexName } from '../../utils/inquires/inquireIndexName.js';
import { logger } from '../../utils/logger/logger.js';
import { executeImportToIndexQuery } from './helpers/executeImportToIndexQuery.js';

export async function importToIndex() {
  try {
    const indexNamesArr = await getAllIndexesNames();

    if (!indexNamesArr.length) {
      logger.info(`${COLORS.green}No indexes found. Create one first?${COLORS.stop}`);

      return;
    }

    const selectedIndex = await inquireIndexName(indexNamesArr);

    const response = await executeImportToIndexQuery(selectedIndex);

    const beautifulResponse = beautifyJson(response);

    console.log(COLORS.blue, beautifulResponse, COLORS.stop);
  } catch (_error: any) {
    _error;
  }
}
