import os from 'os';
import path from 'path';

export const ES_TOOL_NAME = 'es-cli-tool';
export const CONFIG_PATH = path.join(os.homedir(), `.${ES_TOOL_NAME}`, 'config.json');
