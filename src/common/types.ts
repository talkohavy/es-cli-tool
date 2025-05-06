// NOTE! The values on the right need to be an exact match to the command names a user types.
export enum Commands {
  Add = 'add',
  CreateContext = 'create-context',
  CreateIndex = 'create-index',
  CurrentContext = 'current-context',
  DeleteContext = 'delete-context',
  DeleteDocument = 'delete',
  DeleteIndex = 'delete-index',
  ImportToIndex = 'import',
  ClearAll = 'clear-all',
  Get = 'get',
  GetMapping = 'get-mapping',
  GetSettings = 'get-settings',
  IndexList = 'index-list',
  UpdateDocument = 'update',
  UpdateMapping = 'update-mapping',
  UseContext = 'use-context',
  Export = 'export',
}

export enum EditorTypes {
  Vim = 'vim',
  Vi = 'vi',
  Nano = 'nano',
  Code = 'code',
}
