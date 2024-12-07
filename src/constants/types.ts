// NOTE! The values on the right need to be an exact match to the command names a user types.
export enum Commands {
  CreateIndex = 'create-index',
  DeleteIndex = 'delete-index',
  ImportToIndex = 'import',
  ClearAll = 'clear-all',
  Add = 'add',
  Delete = 'delete',
  Get = 'get',
  GetMapping = 'get-mapping',
  GetSettings = 'get-settings',
  UpdateMapping = 'update-mapping',
}

export enum EditorTypes {
  Vim = 'vim',
  Vi = 'vi',
  Nano = 'nano',
  Code = 'code',
}
