#!/usr/bin/env node

import os from 'os';
import { hideBin } from 'yargs/helpers';
import yargs from 'yargs/yargs';
import { add, addBuilder, addCommandString, addDescription } from './commands/add/add.js';
import { clearAll, clearAllCommandString, clearAllDescription } from './commands/clear-all/clear-all.js';
import {
  createContext,
  createContextBuilder,
  createContextCommandString,
  createContextDescription,
} from './commands/create-context/create-context.js';
import { createIndex, createIndexCommandString, createIndexDescription } from './commands/create-index/create-index.js';
import {
  currentContext,
  currentContextCommandString,
  currentContextDescription,
} from './commands/current-context/current-context.js';
import { deleteDocument, deleteDocumentCommandString, deleteDocumentDescription } from './commands/delete/delete.js';
import {
  deleteContext,
  deleteContextBuilder,
  deleteContextCommandString,
  deleteContextDescription,
} from './commands/delete-context/delete-context.js';
import { deleteIndex, deleteIndexCommandString, deleteIndexDescription } from './commands/delete-index/delete-index.js';
import { get, getBuilder, getCommandString, getDescription } from './commands/get/get.js';
import { getMapping, getMappingCommandString, getMappingDescription } from './commands/get-mapping/get-mapping.js';
import { getSettings, getSettingsCommandString, getSettingsDescription } from './commands/get-settings/get-settings.js';
import {
  importToIndex,
  importToIndexBuilder,
  importToIndexCommandString,
  importToIndexDescription,
} from './commands/import-to-index/import-to-index.js';
import { update, updateBuilder, updateCommandString, updateDescription } from './commands/update/update.js';
import {
  updateMapping,
  updateMappingBuilder,
  updateMappingCommandString,
  updateMappingDescription,
} from './commands/update-mapping/update-mapping.js';
import {
  UseContext,
  useContextBuilder,
  useContextCommandString,
  useContextDescription,
} from './commands/use-context/use-context.js';
import { bigTextEsTool } from './constants/bigTextEsTool.js';
import { COLORS } from './constants/colors.js';
import { showVersion } from './flags/version.js';

const __no_op__: any = () => {};
function errorSilencer(cb: (props?: any) => any) {
  return async (props: any) => {
    try {
      await cb(props);
    } catch (_error) {
      _error;
    }
  };
}

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
   */
  .command(createContextCommandString, createContextDescription, createContextBuilder, errorSilencer(createContext))
  .command(useContextCommandString, useContextDescription, useContextBuilder, errorSilencer(UseContext))
  .command(currentContextCommandString, currentContextDescription, __no_op__, errorSilencer(currentContext))
  .command(deleteContextCommandString, deleteContextDescription, deleteContextBuilder, errorSilencer(deleteContext))
  .command(createIndexCommandString, createIndexDescription, __no_op__, errorSilencer(createIndex))
  .command(deleteIndexCommandString, deleteIndexDescription, __no_op__, errorSilencer(deleteIndex))
  .command(clearAllCommandString, clearAllDescription, __no_op__, errorSilencer(clearAll))
  .command(importToIndexCommandString, importToIndexDescription, importToIndexBuilder, errorSilencer(importToIndex))
  .command(addCommandString, addDescription, addBuilder, errorSilencer(add))
  .command(updateCommandString, updateDescription, updateBuilder, errorSilencer(update))
  .command(deleteDocumentCommandString, deleteDocumentDescription, __no_op__, errorSilencer(deleteDocument))
  .command(getCommandString, getDescription, getBuilder, errorSilencer(get))
  .command(getMappingCommandString, getMappingDescription, __no_op__, errorSilencer(getMapping))
  .command(getSettingsCommandString, getSettingsDescription, __no_op__, errorSilencer(getSettings))
  .command(updateMappingCommandString, updateMappingDescription, updateMappingBuilder, errorSilencer(updateMapping))
  .options({
    v: {
      alias: 'version',
      type: 'boolean',
      description: 'Show es-cli-tool version',
      default: false,
      global: false,
    },
    h: {
      alias: 'help',
      type: 'boolean',
      description: 'Show help manual',
    },
    color: {
      type: 'boolean',
      default: true,
      description:
        'Colorizes the output. Defaults to `true`. Use `--no-color` to negate it - useful when wanting to write the output to a file.',
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
}

run();
