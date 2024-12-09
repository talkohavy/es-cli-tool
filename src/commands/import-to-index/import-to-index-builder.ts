import { Argv } from 'yargs';

export const importToIndexBuilder: any = (yargs: Argv) => {
  yargs
    .option('index', {
      type: 'string',
      description: 'Specify the target index.',
    })
    .example('es-cli-tool import --index users', 'Imports into the users users index.');
  yargs
    .option('file', {
      type: 'string',
      alias: 'f',
      demandOption: true,
      description: 'Use this file to import data from.',
    })
    .example('es-cli-tool import --file data.json', 'Imports data to an index from data.json file.');
};
