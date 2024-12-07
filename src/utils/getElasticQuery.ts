import { inquireElasticQuery } from './inquires/inquireElasticQuery.js';
import { readQueryFromFile } from './readQueryFromFile.js';

export async function getElasticQuery(file?: string) {
  if (file) return readQueryFromFile(file);

  const elasticQueryFromEditor = await inquireElasticQuery();

  return elasticQueryFromEditor;
}
