import { input } from '@inquirer/prompts';
import { COLORS } from '../../../constants/colors.js';

export async function inquireNewIndexName() {
  console.log('');

  console.log(`${COLORS.green} ✨  Please enter a new index name:`);

  const newIndexName = await input({ message: 'Index name:' });

  return newIndexName;
}
