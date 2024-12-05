import os from 'os';
import { COLORS } from '../../constants/colors.js';
import { executeAddQuery } from './helpers/executeAddQuery.js';
import { getAllIndexesNames } from './helpers/getAllIndexesNames.js';
import { inquireElasticQuery } from './helpers/inquireElasticQuery.js';
import { inquireIndexName } from './helpers/inquireIndexName.js';
import { validateAndTransformQuery } from './helpers/validateAndTransformQuery.js';

// If you're gonna use emojis, use one of these:
// 🎩👑🌺⭐️✨❄️🥗🏆🎗️🥇🚀💎💊🔑🎁🎀✏️🔍🔓🛑❌✅💯❌🟢🟡🟠🔴🔵

export async function add() {
  try {
    const indexNamesArr = await getAllIndexesNames();

    const selectedIndex = await inquireIndexName(indexNamesArr);

    const elasticQueryStr = await inquireElasticQuery();

    if (!elasticQueryStr) return;

    const elasticQuery = await validateAndTransformQuery(elasticQueryStr);

    const response = await executeAddQuery({ index: selectedIndex, query: elasticQuery });

    console.log('response is:', response);
  } catch (_error: any) {
    console.log(`${os.EOL}${COLORS.red}Bye.${COLORS.stop}${os.EOL}`);
  }
}
