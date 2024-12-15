import os from 'os';
import path from 'path';
import { COLORS } from './colors.js';

export const ES_TOOL_NAME = 'es-cli-tool';
export const CONFIG_PATH = path.join(os.homedir(), `.${ES_TOOL_NAME}`, 'config.json');

export const bigTextEsTool = `
${COLORS.bold}${COLORS.blue}__________________________________________________________
  ___ _   _ _ __   ___ _ __    __ _ _   _  ___ _ __ _   _ 
 / __| | | | '_ \\ / _ \\ '__|  / _\` | | | |/ _ \\ '__| | | |
 \\__ \\ |_| | |_) |  __/ |    | (_| | |_| |  __/ |  | |_| |
 |___/\\__,_| .__/ \\___|_|     \\__, |\\__,_|\\___|_|   \\__, |
           |_|                   |_|                |___/ 
__________________________________________________________${COLORS.stop}`;
