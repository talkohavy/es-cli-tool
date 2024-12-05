import os from 'os';
import { COLORS } from '../../constants/colors.js';
import { beautifyJson } from '../../utils/beautifyJson.js';
import { getAllIndexesNames } from '../../utils/getAllIndexesNames.js';
import { inquireElasticQuery } from '../../utils/inquires/inquireElasticQuery.js';
import { inquireIndexName } from '../../utils/inquires/inquireIndexName.js';
import { validateAndTransformQuery } from '../../utils/validateAndTransformQuery.js';
import { executeGetQuery } from './helpers/executeGetQuery.js';

export async function get() {
  try {
    const indexNamesArr = await getAllIndexesNames();

    const selectedIndex = await inquireIndexName(indexNamesArr);

    const elasticQueryStr = await inquireElasticQuery();

    if (!elasticQueryStr) return;

    const elasticQuery = await validateAndTransformQuery(elasticQueryStr);

    const response = await executeGetQuery({ index: selectedIndex, query: elasticQuery });

    const beautifulResponse = beautifyJson(response);

    console.log(COLORS.blue, beautifulResponse, COLORS.stop);
  } catch (_error: any) {
    console.log(`${os.EOL}${COLORS.red}Bye.${COLORS.stop}${os.EOL}`);
  }
}
