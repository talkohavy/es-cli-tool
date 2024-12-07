import fs from 'fs/promises';
import path from 'path';
import { logger } from './logger/logger.js';

export async function readQueryFromFile(file: string) {
  try {
    const pathToJsonQueryFile = path.resolve(file);
    const jsonQueryFileContent = (await fs.readFile(pathToJsonQueryFile)).toString();

    return jsonQueryFileContent;
  } catch (error: any) {
    logger.error(error.message);
  }
}
