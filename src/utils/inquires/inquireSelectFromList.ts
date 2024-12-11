import { Separator, select } from '@inquirer/prompts';
import { COLORS } from '../../constants/colors.js';

export async function inquireSelectFromList(optionsArray: Array<string>, name: string) {
  const options = optionsArray.map((name) => ({ name, value: name, disabled: false }));

  console.log('');

  const selectedOption = await select({
    message: `✨ ${COLORS.green}Choose the ${name}:${COLORS.stop}`,
    choices: [new Separator(), ...options, new Separator()],
    loop: false,
  });

  return selectedOption;
}
