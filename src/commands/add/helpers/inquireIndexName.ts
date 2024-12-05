import { Separator, select } from '@inquirer/prompts';

export async function inquireIndexName(indexNamesArray: Array<string>) {
  const options = indexNamesArray.map((name) => ({ name, value: name, disabled: false }));

  const semverLevel = await select({
    message: '✨ Choose the index:',
    choices: [new Separator(), ...options, new Separator()],
  });

  return semverLevel;
}
