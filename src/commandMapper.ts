import { add } from './commands/add/index.js';
import { createIndex } from './commands/create-index/index.js';
import { deleteDocument } from './commands/delete/delete.js';
import { get } from './commands/get/index.js';
import { Commands } from './constants/types.js';

const COMMAND_MAPPER = {
  [Commands.CreateIndex]: createIndex,
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
