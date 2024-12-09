import { loadConfig } from '../config/config.js';

export function getContext() {
  const config = loadConfig();

  if (!config.currentContext) {
    console.error('No context is set. Use "use-context" to set one.');

    process.exit(1);
  }

  return config.contexts[config.currentContext];
}
