import { Separator, select } from '@inquirer/prompts';

export async function inquireSelectFromList(optionsArray: Array<string>, name: string) {
  const options = optionsArray.map((name) => ({ name, value: name, disabled: false }));

  const selectedOption = await select({
    message: `✨ Choose the ${name}:`,
    choices: [new Separator(), ...options, new Separator()],
  });

  return selectedOption;
}
