import { Argv } from 'yargs';
import { loadConfig, saveConfig } from '../../config/config.js';
import { COLORS } from '../../constants/colors.js';
import { inquireSelectFromList } from '../../utils/inquires/inquireSelectFromList.js';
import { logger } from '../../utils/logger/logger.js';

export const deleteContextCommandString = 'delete-context [name]';
export const deleteContextDescription = 'Delete a specific context.';

export const deleteContextBuilder: any = (yargs: Argv) => {
  yargs.positional('name', {
    describe: 'The name of the context to delete',
    type: 'string',
  });
};

type UseContextProps = {
  name: string;
};

export async function deleteContext(props: UseContextProps) {
  const { name } = props;

  const config = loadConfig();

  const contextsList = config?.contexts ? Object.keys(config.contexts) : [];

  if (contextsList.length === 0) {
    logger.info(`${COLORS.green}You have 0 contexts. Create one?${COLORS.stop}`);

    process.exit(0);
  }

  const selectedContext = name ?? (await inquireSelectFromList(contextsList, 'context'));

  const isExists = config.contexts[selectedContext];

  if (!isExists) {
    logger.error(`Context "${selectedContext}" does not exist.`);

    process.exit(1);
  }

  delete config.contexts[selectedContext];

  const isTheCurrentContext = config.currentContext === selectedContext;

  if (isTheCurrentContext) config.currentContext = null;

  saveConfig(config);

  logger.info(`${COLORS.green}Context "${selectedContext}" deleted successfully.${COLORS.stop}`, {
    newLineBefore: true,
    newLineAfter: true,
  });
}
