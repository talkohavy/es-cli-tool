import { input } from '@inquirer/prompts';
import { COLORS } from '../../../constants/colors.js';

export async function inquireDocumentId() {
  console.log(`${COLORS.green} ✨  Insert the doc id to delete:`);

  const documentId = await input({ message: 'doc id:' });

  return documentId;
}
