import { execSync } from 'child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { getContext } from '../../../common/utils/getContext.js';
import { logger } from '../../../common/utils/logger/logger.js';

type ExecuteImportToIndexQueryProps = {
  index: string;
  file: string;
};

export async function executeImportToIndexQuery(props: ExecuteImportToIndexQueryProps) {
  try {
    const { index, file } = props;
    let fileToUse = file;
    const tempFile = null;

    const context = getContext();

    if (!context) throw new Error('No context found!');

    const { url, flags } = context;

    try {
      const tempFile = createTemporaryBulkFile(file);

      fileToUse = tempFile;
      logger.info(`Created temporary bulk import file at: ${tempFile}`);
    } catch (err: any) {
      logger.warn(`Failed to parse or transform JSON file: ${err.message}`);
      logger.warn('Continue with original file if transformation fails');
    }

    const requestString = `curl -X POST "${url}/${index}/_bulk?pretty" ${flags} --data-binary "@${fileToUse}"`;

    const result = execSync(requestString).toString();

    if (tempFile && fs.existsSync(tempFile)) cleanupTempFile(tempFile);

    return result;
  } catch (error) {
    console.error(error);
    logger.error(`[ES Error] Failed to populate index ${props.index}...`);

    throw error;
  }
}

function cleanupTempFile(tempFile: string) {
  fs.unlinkSync(tempFile);
  logger.info('Cleaned up temporary bulk import file');
}

function createTemporaryBulkFile(file: string) {
  const fileContent = fs.readFileSync(file, 'utf8');
  const jsonContent = JSON.parse(fileContent);

  if (!Array.isArray(jsonContent)) throw new Error(`File is not a JSON array: ${file}`);

  logger.info('Transforming JSON array file to bulk import format...');

  const tempFile = path.join(os.tmpdir(), `es-bulk-import-${Date.now()}.json`);

  const bulkContent = `${jsonContent
    .flatMap((doc) => [JSON.stringify({ index: {} }), JSON.stringify(doc)])
    .join('\n')}\n`;

  fs.writeFileSync(tempFile, bulkContent);

  return tempFile;
}
