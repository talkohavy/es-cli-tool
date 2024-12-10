import { COLORS } from '../../constants/colors.js';
import { AsyncFunction } from '../../types.js';
import { colorizeJson } from '../../utils/colorize-json/colorize-json.js';
import { getAllIndexesNames } from '../../utils/getAllIndexesNames.js';
import { inquireSelectFromList } from '../../utils/inquires/inquireSelectFromList.js';
import { logger } from '../../utils/logger/logger.js';
import { executeGetMapping } from './helpers/executeGetMapping.js';

export const getMappingCommandString = 'get-mapping';
export const getMappingDescription = "Get an index's mapping";

type GetMappingProps = {
  index: string;
  color: boolean;
};

export const getMapping: AsyncFunction = async (props: GetMappingProps) => {
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

  const responseRaw = await executeGetMapping(selectedIndex);

  const response = shouldColorize ? colorizeJson(responseRaw) : responseRaw;

  console.log(response);
};
