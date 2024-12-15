import fs from 'fs';
import path from 'path';
import { CONFIG_PATH } from '../common/constants/globals.js';
import { Config } from './types.js';

export function loadConfig(): Config {
  if (!fs.existsSync(CONFIG_PATH)) {
    fs.mkdirSync(path.dirname(CONFIG_PATH), { recursive: true });
    fs.writeFileSync(CONFIG_PATH, JSON.stringify({ contexts: {}, currentContext: null }, null, 2));
  }

  const configDataStr = fs.readFileSync(CONFIG_PATH, 'utf8');
  const configData = JSON.parse(configDataStr) as Config;

  return configData;
}

export function saveConfig(config: Config) {
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2), 'utf8');
}
