import { COLORS } from '../../constants/colors.js';
import { colorizeJson } from '../../utils/colorize-json/colorize-json.js';
import { getAllIndexesNames } from '../../utils/getAllIndexesNames.js';
import { inquireSelectFromList } from '../../utils/inquires/inquireSelectFromList.js';
import { logger } from '../../utils/logger/logger.js';
import { executeDeleteQuery } from './helpers/executeDeleteQuery.js';
import { inquireDocumentId } from './helpers/inquireDocumentId.js';

export async function deleteDocument() {
  const indexNamesArr = await getAllIndexesNames();

  if (!indexNamesArr.length) {
    logger.info(`${COLORS.green}No indexes found. Create one first?${COLORS.stop}`);

    return;
  }

  const selectedIndex = await inquireSelectFromList(indexNamesArr, 'index');

  const documentId = await inquireDocumentId();

  if (!documentId) return;

  const response = await executeDeleteQuery({ index: selectedIndex, documentId });

  const colorizedResponse = colorizeJson(response);

  console.log(colorizedResponse);
}
