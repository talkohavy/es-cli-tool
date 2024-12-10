import { COLORS } from '../../constants/colors.js';
import { AsyncFunction } from '../../types.js';
import { colorizeJson } from '../../utils/colorize-json/colorize-json.js';
import { getAllIndexesNames } from '../../utils/getAllIndexesNames.js';
import { inquireSelectFromList } from '../../utils/inquires/inquireSelectFromList.js';
import { logger } from '../../utils/logger/logger.js';
import { executeGetSettings } from './helpers/executeGetSettings.js';

export const getSettingsCommandString = 'get-settings';
export const getSettingsDescription = "Get an index's settings";

type GetSettingsProps = {
  file: string;
  index: string;
  color: boolean;
};

export const getSettings: AsyncFunction = async (props: GetSettingsProps) => {
  const { index, color: shouldColorize } = props;

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

  const responseRaw = await executeGetSettings(selectedIndex);

  const response = shouldColorize ? colorizeJson(responseRaw) : responseRaw;

  console.log(response);
};
