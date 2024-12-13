import { add } from './commands/add/add.js';
import { clearAll } from './commands/clear-all/clear-all.js';
import { createContext } from './commands/create-context/create-context.js';
import { createIndex } from './commands/create-index/create-index.js';
import { currentContext } from './commands/current-context/current-context.js';
import { deleteDocument } from './commands/delete/delete.js';
import { deleteContext } from './commands/delete-context/delete-context.js';
import { deleteIndex } from './commands/delete-index/delete-index.js';
import { get } from './commands/get/get.js';
import { getMapping } from './commands/get-mapping/get-mapping.js';
import { getSettings } from './commands/get-settings/get-settings.js';
import { importToIndex } from './commands/import-to-index/import-to-index.js';
import { update } from './commands/update/update.js';
import { updateMapping } from './commands/update-mapping/update-mapping.js';
import { useContext } from './commands/use-context/use-context.js';
import { Commands } from './constants/types.js';

const COMMAND_MAPPER = {
  [Commands.Add]: add,
  [Commands.ClearAll]: clearAll,
  [Commands.CreateContext]: createContext,
  [Commands.CreateIndex]: createIndex,
  [Commands.CurrentContext]: currentContext,
  [Commands.DeleteContext]: deleteContext,
  [Commands.DeleteDocument]: deleteDocument,
  [Commands.DeleteIndex]: deleteIndex,
  [Commands.Get]: get,
  [Commands.GetMapping]: getMapping,
  [Commands.GetSettings]: getSettings,
  [Commands.ImportToIndex]: importToIndex,
  [Commands.UpdateDocument]: update,
  [Commands.UpdateMapping]: updateMapping,
  [Commands.UseContext]: useContext,
};

type commandMapperProps = {
  commands: Array<string>;
  flags: any;
};

export async function commandMapper(props: commandMapperProps) {
  try {
    const { commands, flags } = props;

    const [command] = commands as [Commands];

    await COMMAND_MAPPER[command]({ commands, ...flags });
  } catch (_error) {
    _error;
  }
}
