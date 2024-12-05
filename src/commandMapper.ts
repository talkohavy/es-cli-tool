import { add } from './commands/add/index.js';
import { get } from './commands/get/index.js';
import { publish } from './commands/publish/publish.js';
import { Commands } from './constants/types.js';

const COMMAND_MAPPER = {
  [Commands.Add]: add,
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
