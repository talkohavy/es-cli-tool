import { CreateFileError, ExternalEditor, LaunchEditorError, ReadFileError, RemoveFileError } from 'external-editor';
import { COLORS } from '../../constants/colors.js';
import { ES_QUERY_TOOL_NAME } from '../../constants/globals.js';
import { EditorTypes } from '../../constants/types.js';
import { logger } from '../logger/logger.js';
import { useVsCodeAsEditor } from '../useVsCodeAsEditor.js';

const externalEditorTemplate = '';

type InquireElasticQueryProps = {
  editor?: EditorTypes;
};

export async function inquireElasticQuery(props?: InquireElasticQueryProps) {
  const { editor } = props ?? {};

  console.log(`${COLORS.green} ✨ Enter your query:${COLORS.stop}`);

  const esQuery = getMessageFromExternalEditor(editor);

  return esQuery;
}

function getMessageFromExternalEditor(editor: string = 'code') {
  try {
    const externalEditor = new ExternalEditor(externalEditorTemplate, {
      postfix: '.json',
      prefix: `${ES_QUERY_TOOL_NAME}-`,
    });

    if (editor === EditorTypes.Code) useVsCodeAsEditor(externalEditor);

    const messageFromExternalEditor = externalEditor.run();

    if (externalEditor.lastExitStatus !== 0) throw new Error('The editor exited with a non-zero code');

    try {
      externalEditor.cleanup();
    } catch (err) {
      if (err instanceof RemoveFileError) {
        logger.error('Failed to remove the temporary file');
      } else {
        throw err;
      }
    }

    return messageFromExternalEditor;
  } catch (error: any) {
    if (error instanceof CreateFileError) {
      logger.error('Failed to create the temporary file');
    } else if (error instanceof ReadFileError) {
      logger.error('Failed to read the temporary file');
    } else if (error instanceof LaunchEditorError) {
      logger.error('Failed to launch your editor');
    }

    throw error;
  }
}
