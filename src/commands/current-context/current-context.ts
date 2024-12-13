import { loadConfig } from '../../config/config.js';
import { COLORS } from '../../constants/colors.js';
import { logger } from '../../utils/logger/logger.js';

export const currentContextCommandString = 'current-context';
export const currentContextDescription = 'Show the current context.';

export function currentContext() {
  const config = loadConfig();

  if (!config.currentContext) {
    logger.info(`${COLORS.green}No context is currently set.${COLORS.stop}`);

    process.exit(0);
  }

  const context = config.contexts[config.currentContext]!;

  logger.info(`${COLORS.green}Current context:${COLORS.stop} ${config.currentContext}`, { newLineBefore: true });
  logger.info(`${COLORS.green}URL:${COLORS.stop} ${context.url}`);
  logger.info(`${COLORS.green}Flags:${COLORS.stop} ${context.flags}`, { newLineAfter: true });
}
