import { execSync } from 'child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { logger } from '../../../lib/logger/logger.js';

type ExecuteImportToIndexQueryProps = {
  preparedQuery: string;
  file: string;
};

export async function executeImportToIndexQuery(props: ExecuteImportToIndexQueryProps) {
  try {
    const { preparedQuery, file } = props;
    let filename = null;

    try {
      filename = createTemporaryBulkFile(file);

      logger.info(`Created temporary bulk import file at: ${filename}`);
    } catch (err: any) {
      throw new Error(`Failed to parse or transform JSON file: ${err.message}`);
    }

    const updatedPreparedQuery = preparedQuery.replace(/__FILE_NAME__/g, filename);

    const result = execSync(updatedPreparedQuery).toString();

    if (filename && fs.existsSync(filename)) cleanupTempFile(filename);

    return result;
  } catch (error) {
    console.error(error);
    logger.error('[ES Error] Failed to populate index...');

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
