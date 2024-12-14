import { confirm } from '@inquirer/prompts';
import { COLORS } from '../../constants/colors.js';

type InquireConfirmProps = {
  alternativeMessage?: string;
  /**
   * @default false
   */
  isSure?: boolean;
};

export async function inquireConfirm(props?: InquireConfirmProps) {
  const { isSure, alternativeMessage } = (props ?? {}) as InquireConfirmProps;

  console.log('');

  const shouldMoveForward = await confirm({
    message: `✨ ${alternativeMessage ?? 'Are you sure?'}`,
    default: isSure,
    theme: { style: { defaultAnswer: () => `${COLORS.black}(y/n) › ${COLORS.blue}${isSure ? 'true' : 'false'}` } },
  });

  console.log('');

  return shouldMoveForward;
}
