import { Argv } from 'yargs';
import { COLORS } from '../../constants/colors.js';
import { colorizeJson } from '../../utils/colorize-json/colorize-json.js';
import { getAllIndexesNames } from '../../utils/getAllIndexesNames.js';
import { inquireSelectFromList } from '../../utils/inquires/inquireSelectFromList.js';
import { logger } from '../../utils/logger/logger.js';
import { executeDeleteQuery } from './helpers/executeDeleteQuery.js';
import { inquireDocumentId } from './helpers/inquireDocumentId.js';

export const deleteDocumentCommandString = 'delete';
export const deleteDocumentDescription = 'Delete a document by id';

export const deleteBuilder: any = (yargs: Argv) => {
  yargs
    .option('index', {
      type: 'string',
      description: 'Specify the target index.',
    })
    .example('es-cli-tool delete --index users', 'Executes an DELETE query on the users index.');
  yargs
    .option('id', {
      type: 'string',
      description: 'Specify the id of the document to delete.',
      demandOption: true,
    })
    .example('es-cli-tool delete --index users --id 123', 'Delete the document with id of 123 from the users index.');
};

type DeleteDocumentProps = {
  index?: string;
  id?: string;
};

export async function deleteDocument(props: DeleteDocumentProps) {
  const { index, id } = props;

  const indexNamesArr = await getAllIndexesNames();

  if (!indexNamesArr.length) {
    logger.info(`${COLORS.green}No indexes found. Create one first?${COLORS.stop}`, {
      newLineBefore: true,
      newLineAfter: true,
    });

    return;
  }

  const selectedIndex = index ?? (await inquireSelectFromList(indexNamesArr, 'index'));

  if (!indexNamesArr.includes(selectedIndex)) {
    logger.info(`${COLORS.green}index ${index} doesn't exist...${COLORS.stop}`);

    return;
  }

  const documentId = id ?? (await inquireDocumentId());

  if (!documentId) return;

  const response = await executeDeleteQuery({ index: selectedIndex, documentId });

  const colorizedResponse = colorizeJson(response);

  console.log(colorizedResponse);
}
