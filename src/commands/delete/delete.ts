import { COLORS } from '../../constants/colors.js';
import { colorizeJson } from '../../utils/colorize-json/colorize-json.js';
import { getAllIndexesNames } from '../../utils/getAllIndexesNames.js';
import { inquireIndexName } from '../../utils/inquires/inquireIndexName.js';
import { logger } from '../../utils/logger/logger.js';
import { executeDeleteQuery } from './helpers/executeDeleteQuery.js';
import { inquireDocumentId } from './helpers/inquireDocumentId.js';

export async function deleteDocument() {
  try {
    const indexNamesArr = await getAllIndexesNames();

    if (!indexNamesArr.length) {
      logger.info(`${COLORS.green}No indexes found. Create one first?${COLORS.stop}`);

      return;
    }

    const selectedIndex = await inquireIndexName(indexNamesArr);

    const documentId = await inquireDocumentId();

    if (!documentId) return;

    const response = await executeDeleteQuery({ index: selectedIndex, documentId });

    const colorizedResponse = colorizeJson(response);

    console.log(colorizedResponse);
  } catch (_error: any) {
    _error;
  }
}
