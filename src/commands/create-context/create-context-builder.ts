import { Argv } from 'yargs';

export const createContextBuilder: any = (yargs: Argv) => {
  yargs
    .positional('name', {
      describe: 'The name of the context',
      type: 'string',
      demandOption: true,
    })
    .positional('url', {
      describe: 'The URL of the Elasticsearch server',
      type: 'string',
      demandOption: true,
    });
};
