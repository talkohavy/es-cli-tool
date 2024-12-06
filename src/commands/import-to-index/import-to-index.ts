import { COLORS } from '../../constants/colors.js';
import { colorizeJson } from '../../utils/colorize-json/colorize-json.js';
import { getAllIndexesNames } from '../../utils/getAllIndexesNames.js';
import { inquireIndexName } from '../../utils/inquires/inquireIndexName.js';
import { logger } from '../../utils/logger/logger.js';
import { executeImportToIndexQuery } from './helpers/executeImportToIndexQuery.js';

export async function importToIndex() {
  const indexNamesArr = await getAllIndexesNames();

  if (!indexNamesArr.length) {
    logger.info(`${COLORS.green}No indexes found. Create one first?${COLORS.stop}`);

    return;
  }

  const selectedIndex = await inquireIndexName(indexNamesArr);

  const response = await executeImportToIndexQuery(selectedIndex);

  const colorizedResponse = colorizeJson(response);

  console.log(colorizedResponse);
}
