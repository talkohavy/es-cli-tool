import { confirm } from '@inquirer/prompts';
import { COLORS } from '../../constants/colors.js';

type InquireConfirmProps = {
  message: string;
  /**
   * @default false
   */
  initialIsTrue?: boolean;
};

export async function inquireConfirm(props: InquireConfirmProps) {
  const { message, initialIsTrue } = props;

  console.log('');

  const isTrue = await confirm({
    message,
    default: !!initialIsTrue,
    theme: {
      prefix: '✨',
      style: { defaultAnswer: () => `${COLORS.black}(y/n) › ${COLORS.blue}${initialIsTrue ? 'true' : 'false'}` },
    },
  });

  console.log('');

  return isTrue;
}
