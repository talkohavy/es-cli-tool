import { Argv } from 'yargs';
import { input } from '@inquirer/prompts';
import { COLORS } from '../../common/constants/colors.js';
import { logger } from '../../common/utils/logger/logger.js';
import { loadConfig, saveConfig } from '../../config/config.js';
import { Context } from '../../config/types.js';

export const createContextCommandString = 'create-context [name] [url]';
export const createContextDescription = 'Create a new context.';

export const createContextBuilder: any = (yargs: Argv) => {
  yargs
    .positional('name', {
      describe: 'The name of the context',
      type: 'string',
      demandOption: true,
    })
    .positional('url', {
      describe: 'The URL of the Elasticsearch server',
      type: 'string',
      demandOption: true,
    });
};

type ContextData = {
  name: string;
  url: string;
};

export async function createContext(props: ContextData) {
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
  config.currentContext = newContextName;

  saveConfig(config);

  logger.info(`${COLORS.green}Context "${newContextName}" created.${COLORS.stop}`, {
    newLineBefore: true,
  });
  logger.info(`${COLORS.green}Switched to context "${newContextName}".${COLORS.stop}`, {
    newLineAfter: true,
  });
}

async function inquireNewContextName() {
  console.log('');

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

  const flags = await input({ message: 'Flags:' });

  return flags;
}
