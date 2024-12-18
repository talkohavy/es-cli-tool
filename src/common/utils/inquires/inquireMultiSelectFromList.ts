import { Separator, checkbox } from '@inquirer/prompts';

export type Option = {
  value: string;
  name?: string;
  checked?: boolean;
  disabled?: boolean;
};

type InquireMultiSelectFromListProps = {
  message: string;
  optionsArray: Array<Option>;
};

export async function inquireMultiSelectFromList(props: InquireMultiSelectFromListProps) {
  const { message, optionsArray } = props;

  console.log('');

  const selectedOptions = await checkbox({
    message,
    choices: [new Separator(), ...optionsArray, new Separator()],
    theme: { prefix: '✨' },
  });

  return selectedOptions;
}
