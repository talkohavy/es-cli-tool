#!/usr/bin/env node

import os from 'os';
import { hideBin } from 'yargs/helpers';
import yargs from 'yargs/yargs';
import { commandMapper } from './commandMapper.js';
import { addBuilder, addCommandString, addDescription } from './commands/add/add.js';
import { clearAllCommandString, clearAllDescription } from './commands/clear-all/clear-all.js';
import {
  createContextBuilder,
  createContextCommandString,
  createContextDescription,
} from './commands/create-context/create-context.js';
import { createIndexCommandString, createIndexDescription } from './commands/create-index/create-index.js';
import { currentContextCommandString, currentContextDescription } from './commands/current-context/current-context.js';
import { deleteBuilder, deleteDocumentCommandString, deleteDocumentDescription } from './commands/delete/delete.js';
import {
  deleteContextBuilder,
  deleteContextCommandString,
  deleteContextDescription,
} from './commands/delete-context/delete-context.js';
import {
  deleteIndexBuilder,
  deleteIndexCommandString,
  deleteIndexDescription,
} from './commands/delete-index/delete-index.js';
import { getBuilder, getCommandString, getDescription } from './commands/get/get.js';
import {
  getMappingBuilder,
  getMappingCommandString,
  getMappingDescription,
} from './commands/get-mapping/get-mapping.js';
import {
  getSettingsBuilder,
  getSettingsCommandString,
  getSettingsDescription,
} from './commands/get-settings/get-settings.js';
import {
  importToIndexBuilder,
  importToIndexCommandString,
  importToIndexDescription,
} from './commands/import-to-index/import-to-index.js';
import { updateBuilder, updateCommandString, updateDescription } from './commands/update/update.js';
import {
  updateMappingBuilder,
  updateMappingCommandString,
  updateMappingDescription,
} from './commands/update-mapping/update-mapping.js';
import {
  useContextBuilder,
  useContextCommandString,
  useContextDescription,
} from './commands/use-context/use-context.js';
import { COLORS } from './common/constants/colors.js';
import { toolNameBigText } from './common/constants/globals.js';
import { showVersion } from './common/utils/showVersion.js';

const __no_op__: any = () => {};

// A full description on each of the following functions is found under the `lvlup` project.
const yargsInstance = yargs(hideBin(process.argv))
  .completion()
  .scriptName(`${COLORS.green}es-cli-tool${COLORS.stop}`)
  .version(false)
  .command(createContextCommandString, createContextDescription, createContextBuilder)
  .command(useContextCommandString, useContextDescription, useContextBuilder)
  .command(currentContextCommandString, currentContextDescription, __no_op__)
  .command(deleteContextCommandString, deleteContextDescription, deleteContextBuilder)
  .command(createIndexCommandString, createIndexDescription, __no_op__)
  .command(deleteIndexCommandString, deleteIndexDescription, deleteIndexBuilder)
  .command(clearAllCommandString, clearAllDescription, __no_op__)
  .command(importToIndexCommandString, importToIndexDescription, importToIndexBuilder)
  .command(addCommandString, addDescription, addBuilder)
  .command(updateCommandString, updateDescription, updateBuilder)
  .command(deleteDocumentCommandString, deleteDocumentDescription, deleteBuilder)
  .command(getCommandString, getDescription, getBuilder)
  .command(getMappingCommandString, getMappingDescription, getMappingBuilder)
  .command(getSettingsCommandString, getSettingsDescription, getSettingsBuilder)
  .command(updateMappingCommandString, updateMappingDescription, updateMappingBuilder)
  .options({
    v: {
      alias: 'version',
      type: 'boolean',
      description: 'Show es-cli-tool version',
      global: false,
      default: false,
    },
    h: {
      alias: 'help',
      type: 'boolean',
      description: 'Show help manual',
      global: true,
      default: false,
    },
    color: {
      type: 'boolean',
      description:
        'Colorizes the output. Defaults to `true`. Use `--no-color` to negate it - useful when wanting to write the output to a file.',
      global: true,
      default: true,
    },
  })
  .showHelpOnFail(false, 'Specify --help for available options')
  .strict()
  .updateStrings({
    'Positionals:': `${COLORS.blue}Positionals:${COLORS.stop}`,
    'Commands:': `${COLORS.blue}Commands:${COLORS.stop}`,
    'Options:': `${COLORS.blue}Flags:${COLORS.stop}`,
    'Examples:': `${COLORS.blue}Examples:${COLORS.stop}`,
  })
  .help(false);

type ArgsV = { $0: any; _: Array<string> } & Record<string, string | number | boolean>;

async function run() {
  const argv = yargsInstance.parse();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { $0: cliToolName, _: commands, ...flags } = argv as ArgsV;
  if (flags.version) {
    await showVersion();
    process.exit(0);
  }

  if (flags.help || commands?.length === 0) {
    const helpMenuAsText = await yargsInstance.getHelp();
    const helpTextBig = `${toolNameBigText}${os.EOL}${os.EOL}${helpMenuAsText}`;
    console.log(helpTextBig);
    process.exit(0);
  }

  await commandMapper({ commands, flags });
}

run();
