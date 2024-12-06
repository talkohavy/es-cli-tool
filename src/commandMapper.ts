import { add } from './commands/add/index.js';
import { clearAll } from './commands/clear-all/index.js';
import { createIndex } from './commands/create-index/index.js';
import { deleteDocument } from './commands/delete/index.js';
import { deleteIndex } from './commands/delete-index/index.js';
import { get } from './commands/get/index.js';
import { importToIndex } from './commands/import-to-index/index.js';
import { Commands } from './constants/types.js';

const COMMAND_MAPPER = {
  [Commands.CreateIndex]: createIndex,
  [Commands.DeleteIndex]: deleteIndex,
  [Commands.ImportToIndex]: importToIndex,
  [Commands.ClearAll]: clearAll,
  [Commands.Add]: add,
  [Commands.Delete]: deleteDocument,
  [Commands.Get]: get,
};

type commandMapperProps = {
  commands: Array<string>;
  flags: any;
};

export function commandMapper(props: commandMapperProps) {
  const { commands } = props;

  const [command] = commands as [Commands];

  COMMAND_MAPPER[command]();
}
