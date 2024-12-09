import { Argv } from 'yargs';
import { EditorTypes } from '../../constants/types.js';

export const getBuilder: any = (yargs: Argv) => {
  yargs
    .option('index', {
      type: 'string',
      description: 'Specify the target index.',
    })
    .example('es-cli-tool get --index users', 'Executes a GET query on the users index.');
  yargs
    .option('file', {
      type: 'string',
      alias: 'f',
      description: 'Use a file as the query to execute.',
    })
    .example('es-cli-tool get --file query.json', 'Executes the query in that file.');
  yargs
    .option('editor', {
      type: 'string',
      choices: [EditorTypes.Vi, EditorTypes.Vim, EditorTypes.Nano, EditorTypes.Code] as Array<EditorTypes>,
      description: 'Choose the external editor for editing your query.',
    })
    .example(
      'es-cli-tool get --editor vim',
      'Would open up vim as editor when you hit enter on the insert message prompt.',
    );
};
