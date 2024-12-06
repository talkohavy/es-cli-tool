import { add } from './commands/add/add.js';
import { clearAll } from './commands/clear-all/clear-all.js';
import { createIndex } from './commands/create-index/create-index.js';
import { deleteDocument } from './commands/delete/delete.js';
import { deleteIndex } from './commands/delete-index/delete-index.js';
import { get } from './commands/get/get.js';
import { getMapping } from './commands/get-mapping/get-mapping.js';
import { getSettings } from './commands/get-settings/get-settings.js';
import { importToIndex } from './commands/import-to-index/import-to-index.js';
import { Commands } from './constants/types.js';

const COMMAND_MAPPER = {
  [Commands.CreateIndex]: createIndex,
  [Commands.DeleteIndex]: deleteIndex,
  [Commands.ImportToIndex]: importToIndex,
  [Commands.ClearAll]: clearAll,
  [Commands.Add]: add,
  [Commands.Delete]: deleteDocument,
  [Commands.Get]: get,
  [Commands.GetMapping]: getMapping,
  [Commands.GetSettings]: getSettings,
};

type commandMapperProps = {
  commands: Array<string>;
  flags: any;
};

export async function commandMapper(props: commandMapperProps) {
  try {
    const { commands } = props;

    const [command] = commands as [Commands];

    await COMMAND_MAPPER[command]();
  } catch (_error: any) {
    _error;
  }
}
