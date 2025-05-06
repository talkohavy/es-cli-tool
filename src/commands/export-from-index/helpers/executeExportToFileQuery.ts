import { writeFileSync } from 'fs';
import { MAX_SIZE } from '../../../common/constants/globals.js';
import { getMatchAllQuery } from '../../../common/utils/getMatchAllQuery.js';
import { logger } from '../../../common/utils/logger/logger.js';
import { executeGetQuery } from '../../get/helpers/executeGetQuery.js';

type ExecuteExportToFileQueryProps = {
  index: string;
  file: string;
};

export async function executeExportToFileQuery(props: ExecuteExportToFileQueryProps) {
  const { index, file: filePath } = props;

  const query = getMatchAllQuery(MAX_SIZE);
  const getResponseRaw = await executeGetQuery({ index, query });
  const getResponse = JSON.parse(getResponseRaw);

  const resultToStore = getResponse.hits.hits.map((hit: any) => hit._source);
  const fileContent = JSON.stringify(resultToStore);

  try {
    writeFileSync(filePath, fileContent, 'utf8');
  } catch (error) {
    console.error(error);
  }

  logger.info(`Data exported to ${filePath}`, {
    newLineBefore: true,
    newLineAfter: true,
  });
}
