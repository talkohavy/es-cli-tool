import { add } from './commands/add/index.js';
import { createIndex } from './commands/create-index/index.js';
import { deleteDocument } from './commands/delete/delete.js';
import { get } from './commands/get/index.js';
import { publish } from './commands/publish/publish.js';
import { Commands } from './constants/types.js';

const COMMAND_MAPPER = {
  [Commands.CreateIndex]: createIndex,
  [Commands.Add]: add,
  [Commands.Delete]: deleteDocument,
  [Commands.Get]: get,
  [Commands.Publish]: publish,
};

type commandMapperProps = {
  commands: Array<string>;
  flags: any;
};

export function commandMapper(props: commandMapperProps) {
  const { commands, flags } = props;

  const [command] = commands as [Commands];

  COMMAND_MAPPER[command](flags);
}
