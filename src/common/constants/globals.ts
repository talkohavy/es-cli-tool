import os from 'os';
import path from 'path';
import { COLORS } from './colors.js';

export const CLI_TOOL_NAME = 'es-cli-tool';
export const CONFIG_PATH = path.join(os.homedir(), `.${CLI_TOOL_NAME}`, 'config.json');

export const MAX_SIZE = 10000;

export const toolNameBigText = `
${COLORS.bold}${COLORS.blue}__________________________________________________________
  ___ _   _ _ __   ___ _ __    __ _ _   _  ___ _ __ _   _ 
 / __| | | | '_ \\ / _ \\ '__|  / _\` | | | |/ _ \\ '__| | | |
 \\__ \\ |_| | |_) |  __/ |    | (_| | |_| |  __/ |  | |_| |
 |___/\\__,_| .__/ \\___|_|     \\__, |\\__,_|\\___|_|   \\__, |
           |_|                   |_|                |___/ 
__________________________________________________________${COLORS.stop}`;
