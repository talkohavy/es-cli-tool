import { Argv } from 'yargs';

export const useContextBuilder: any = (yargs: Argv) => {
  yargs.positional('name', {
    describe: 'The name of the context to switch to',
    type: 'string',
  });
};
