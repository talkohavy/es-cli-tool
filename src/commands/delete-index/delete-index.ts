import { COLORS } from '../../constants/colors.js';
import { colorizeJson } from '../../utils/colorize-json/colorize-json.js';
import { getAllIndexesNames } from '../../utils/getAllIndexesNames.js';
import { inquireIndexName } from '../../utils/inquires/inquireIndexName.js';
import { logger } from '../../utils/logger/logger.js';
import { executeDeleteIndexQuery } from './helpers/executeDeleteIndexQuery.js';

export async function deleteIndex() {
  const indexNamesArr = await getAllIndexesNames();

  if (!indexNamesArr.length) {
    logger.info(`${COLORS.green}No indexes found. Create one first?${COLORS.stop}`);

    return;
  }

  const selectedIndex = await inquireIndexName(indexNamesArr);

  const response = await executeDeleteIndexQuery(selectedIndex);

  const colorizedResponse = colorizeJson(response);

  console.log(colorizedResponse);
}
