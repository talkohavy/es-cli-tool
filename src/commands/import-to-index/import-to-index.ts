import { COLORS } from '../../constants/colors.js';
import { AsyncFunction } from '../../types.js';
import { colorizeJson } from '../../utils/colorize-json/colorize-json.js';
import { getAllIndexesNames } from '../../utils/getAllIndexesNames.js';
import { inquireSelectFromList } from '../../utils/inquires/inquireSelectFromList.js';
import { logger } from '../../utils/logger/logger.js';
import { executeImportToIndexQuery } from './helpers/executeImportToIndexQuery.js';

type ImportToIndexProps = {
  index: string;
  file: string;
};

export const importToIndex: AsyncFunction = async (props: ImportToIndexProps) => {
  const { index, file } = props;

  const indexNamesArr = await getAllIndexesNames();

  if (!indexNamesArr.length) {
    logger.info(`${COLORS.green}No indexes found. Create one first?${COLORS.stop}`);

    return;
  }

  const selectedIndex = index ?? (await inquireSelectFromList(indexNamesArr, 'index'));

  if (!indexNamesArr.includes(selectedIndex)) {
    logger.info(`${COLORS.green}index ${index} doesn't exist...${COLORS.stop}`);

    return;
  }

  if (!file) {
    logger.info(`${COLORS.green}You MUST enter a correct path to file...${COLORS.stop}`);

    return;
  }

  const response = await executeImportToIndexQuery({ index: selectedIndex, file });

  const colorizedResponse = colorizeJson(response);

  console.log(colorizedResponse);
};
