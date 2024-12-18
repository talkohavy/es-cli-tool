import { input } from '@inquirer/prompts';

type InquireValueProps = {
  message: string;
  defaultValue?: string;
};

export async function inquireValue(props: InquireValueProps) {
  const { defaultValue, message } = props;

  const inputValue = await input({
    message,
    default: defaultValue,
    theme: { prefix: '✨' },
  });

  return inputValue;
}
