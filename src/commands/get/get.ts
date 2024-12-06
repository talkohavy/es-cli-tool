import { COLORS } from '../../constants/colors.js';
import { colorizeJson } from '../../utils/colorize-json/colorize-json.js';
import { getAllIndexesNames } from '../../utils/getAllIndexesNames.js';
import { inquireElasticQuery } from '../../utils/inquires/inquireElasticQuery.js';
import { inquireIndexName } from '../../utils/inquires/inquireIndexName.js';
import { logger } from '../../utils/logger/logger.js';
import { validateAndTransformQuery } from '../../utils/validateAndTransformQuery.js';
import { executeGetQuery } from './helpers/executeGetQuery.js';

export async function get() {
  const indexNamesArr = await getAllIndexesNames();

  if (!indexNamesArr.length) {
    logger.info(`${COLORS.green}No indexes found. Create one first?${COLORS.stop}`);

    return;
  }

  const selectedIndex = await inquireIndexName(indexNamesArr);

  const elasticQueryStr = await inquireElasticQuery();

  if (!elasticQueryStr) return;

  const elasticQuery = await validateAndTransformQuery(elasticQueryStr);

  const response = await executeGetQuery({ index: selectedIndex, query: elasticQuery });

  const colorizedResponse = colorizeJson(response);

  console.log(colorizedResponse);
}
