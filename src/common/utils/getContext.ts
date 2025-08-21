import { loadConfig } from '../../config/config.js';
import { logger } from '../../lib/logger/logger.js';

export function getContext() {
  const config = loadConfig();

  if (!config.currentContext) {
    logger.error('No context is set. Use "use-context" to set one.', {
      newLineBefore: true,
      newLineAfter: true,
    });

    process.exit(0);
  }

  return config.contexts[config.currentContext];
}
