import { COLORS } from '../../constants/colors.js';
import { colorizeJson } from '../../utils/colorize-json/colorize-json.js';
import { getAllIndexesNames } from '../../utils/getAllIndexesNames.js';
import { inquireElasticQuery } from '../../utils/inquires/inquireElasticQuery.js';
import { inquireIndexName } from '../../utils/inquires/inquireIndexName.js';
import { logger } from '../../utils/logger/logger.js';
import { readQueryFromFile } from '../../utils/readQueryFromFile.js';
import { validateAndTransformQuery } from '../../utils/validateAndTransformQuery.js';
import { executeGetQuery } from './helpers/executeGetQuery.js';

type GetProps = {
  file: string;
  index: string;
};

export async function get(props: GetProps) {
  const { index, file } = props;

  const indexNamesArr = await getAllIndexesNames();

  if (!indexNamesArr.length) {
    logger.info(`${COLORS.green}No indexes found. Create one first?${COLORS.stop}`);

    return;
  }

  const selectedIndex = index ?? (await inquireIndexName(indexNamesArr));

  if (!indexNamesArr.includes(index)) {
    logger.info(`${COLORS.green}index ${index} doesn't exist...${COLORS.stop}`);

    return;
  }

  const elasticQueryStr = await getElasticQuery(file);

  if (!elasticQueryStr) return;

  const elasticQuery = await validateAndTransformQuery(elasticQueryStr);

  const response = await executeGetQuery({ index: selectedIndex, query: elasticQuery });

  const colorizedResponse = colorizeJson(response);

  console.log(colorizedResponse);
}

async function getElasticQuery(file?: string) {
  if (file) return readQueryFromFile(file);

  const elasticQueryFromEditor = await inquireElasticQuery();

  return elasticQueryFromEditor;
}
