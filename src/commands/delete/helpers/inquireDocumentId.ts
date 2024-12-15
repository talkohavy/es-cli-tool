import { input } from '@inquirer/prompts';
import { COLORS } from '../../../common/constants/colors.js';

export async function inquireDocumentId() {
  console.log('');

  console.log(`${COLORS.green}${COLORS.bold}? ✨ Insert the doc id to delete:`);

  const documentId = await input({ message: 'doc id:' });

  return documentId;
}
