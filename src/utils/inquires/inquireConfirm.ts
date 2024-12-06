import { confirm } from '@inquirer/prompts';
import { COLORS } from '../../constants/colors.js';

async function inquireConfirm(alternativeMessage?: string) {
  const shouldMoveForward = await confirm({
    message: `✨ ${alternativeMessage ?? 'Are you sure?'}`,
    default: true,
    theme: { style: { defaultAnswer: () => `${COLORS.black}(Y/n) › ${COLORS.blue}true` } },
  });

  return shouldMoveForward;
}

export { inquireConfirm };
