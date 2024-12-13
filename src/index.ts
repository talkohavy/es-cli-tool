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
import { deleteIndexCommandString, deleteIndexDescription } from './commands/delete-index/delete-index.js';
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
import { COLORS } from './constants/colors.js';
import { bigTextEsTool } from './constants/globals.js';
import { showVersion } from './flags/version.js';

const __no_op__: any = () => {};

type ArgsV = {
  $0: any;
  _: Array<string>;
} & Record<string, string | number | boolean>;

const yargsInstance = yargs(hideBin(process.argv))
  /**
   * @description
   * Set the name of your script ($0). Default is the base filename executed by node (process.argv[1] or process.argv[0] for built electron apps)
   *
   * The name will appear at to the of the hemp menu
   */
  .scriptName(`${COLORS.green}es-cli-tool${COLORS.stop}`)
  /**
   * @description
   * I put version to `false`, because yargs do not support -v, only --version, and I would like to have both.
   *
   * Add an option (e.g. --version) that displays the version number (given by the version parameter) and exits the process. By default yargs enables version for the --version option.
   *
   * If no arguments are passed to version (.version()), yargs will parse the package.json of your module and use its version value.
   *
   * If the boolean argument false is provided, it will disable --version.
   */
  .version(false)
  /**
   * @description
   *
   * Define the commands exposed by your application.
   *
   * cmd should be a string representing the command or an array of strings representing the command and its aliases. Read more about command aliases in the subsection below.
   *
   * Use desc to provide a description for each command your application accepts (the values stored in argv._). Set desc to false to create a hidden command. Hidden commands don't show up in the help output and aren't available for completion.
   *
   * Optionally, you can provide a builder object to give hints about the options that your command accepts:
   *
   * IMPORTANT! Do NOT use the 4 parameters, which is the handler, since it cancels out the help for sub-commands.
   */
  .command(createContextCommandString, createContextDescription, createContextBuilder)
  .command(useContextCommandString, useContextDescription, useContextBuilder)
  .command(currentContextCommandString, currentContextDescription, __no_op__)
  .command(deleteContextCommandString, deleteContextDescription, deleteContextBuilder)
  .command(createIndexCommandString, createIndexDescription, __no_op__)
  .command(deleteIndexCommandString, deleteIndexDescription, __no_op__)
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
  .showHelpOnFail(false, 'Specify --help for available options') // default value is true.
  .strict() // <--- any unknown command, or unknown flag, will raise an error.
  .updateStrings({
    'Positionals:': `${COLORS.blue}Positionals:${COLORS.stop}`, // <--- I will never use these. only Options, which I alias as 'Flags'.
    'Commands:': `${COLORS.blue}Commands:${COLORS.stop}`,
    'Options:': `${COLORS.blue}Flags:${COLORS.stop}`,
    'Examples:': `${COLORS.blue}Examples:${COLORS.stop}`,
  })
  /**
   * Configure an (e.g. --help) and implicit command that displays the usage string and exits the process. By default yargs enables help on the --help option.
   *
   * If present, the description parameter customizes the description of the help option in the usage string.
   *
   * If the boolean argument false is provided, it will disable --help.
   *
   * Note that any multi-char aliases (e.g. help) used for the help option will also be used for the implicit command. If there are no multi-char aliases (e.g. h), then all single-char aliases will be used for the command.
   *
   * If invoked without parameters, .help() will use --help as the option and help as the implicit command to trigger help output.
   */
  .help(false); // <--- help('help') & help() result in the same behavior.

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
    const helpTextBig = `${bigTextEsTool}${os.EOL}${os.EOL}${helpMenuAsText}`;
    console.log(helpTextBig);
    process.exit(0);
  }

  await commandMapper({ commands, flags });
}

run();
