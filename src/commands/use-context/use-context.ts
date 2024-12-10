import { Argv } from 'yargs';
import { loadConfig, saveConfig } from '../../config/config.js';
import { COLORS } from '../../constants/colors.js';
import { AsyncFunction } from '../../types.js';
import { inquireSelectFromList } from '../../utils/inquires/inquireSelectFromList.js';
import { logger } from '../../utils/logger/logger.js';

export const useContextCommandString = 'use-context [name]';
export const useContextDescription = 'Switch to a specific context';

export const useContextBuilder: any = (yargs: Argv) => {
  yargs.positional('name', {
    describe: 'The name of the context to switch to',
    type: 'string',
  });
};

type UseContextProps = {
  name: string;
};

export const UseContext: AsyncFunction = async (props: UseContextProps) => {
  const { name } = props;

  const config = loadConfig();

  const contextsList = config?.contexts ? Object.keys(config.contexts) : [];

  if (contextsList.length === 0) {
    logger.info(`${COLORS.green}You have 0 contexts. Create one?${COLORS.stop}`);

    process.exit(0);
  }

  const selectedContext = name ?? (await inquireSelectFromList(contextsList, 'context'));

  const isAlreadyExists = config.contexts[selectedContext];

  if (!isAlreadyExists) {
    logger.error(`Context "${selectedContext}" does not exist.`);

    process.exit(1);
  }

  if (config.currentContext === selectedContext) {
    logger.info(`${COLORS.green}Context "${selectedContext}" already selected. Did nothing.${COLORS.stop}`);

    process.exit(0);
  }

  config.currentContext = selectedContext;

  saveConfig(config);

  logger.info(`${COLORS.green}Switched to context "${selectedContext}".${COLORS.stop}`);
};
