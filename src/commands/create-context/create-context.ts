import { input } from '@inquirer/prompts';
import { loadConfig, saveConfig } from '../../config/config.js';
import { Context } from '../../config/types.js';
import { COLORS } from '../../constants/colors.js';
import { AsyncFunction } from '../../types.js';
import { logger } from '../../utils/logger/logger.js';

type ContextData = {
  name: string;
  url: string;
};

export const createContext: AsyncFunction = async (props: ContextData) => {
  const { name, url } = props;

  const config = loadConfig();

  const newContextName = name ?? (await inquireNewContextName());

  if (config.contexts[newContextName]) {
    logger.error(`Context "${newContextName}" already exists.`);

    process.exit(1);
  }

  const esUrl = url ?? (await inquireUrl());

  const flags = await inquireFlags();

  const newContext: Context = { url: esUrl, flags };

  config.contexts[newContextName] = newContext;

  saveConfig(config);

  logger.info(`${COLORS.green}Context "${newContextName}" created.${COLORS.stop}`);
};

async function inquireNewContextName() {
  console.log(`${COLORS.green} ✨  Please enter a new context name:`);

  const newContextName = await input({ message: 'Context name:' });

  return newContextName;
}

async function inquireUrl() {
  console.log(`${COLORS.green} ✨  Enter the elasticsearch url:`);

  const url = await input({ message: 'Full URL:' });

  return url;
}
async function inquireFlags() {
  console.log(`${COLORS.green} ✨  Enter as many flags as you want`);

  const flagsStr = await input({ message: 'Flags:' });

  const flags = flagsStr.split(' ').filter((word) => word.trim());

  return flags;
}
