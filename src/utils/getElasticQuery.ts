import { inquireElasticQuery } from './inquires/inquireElasticQuery.js';
import { readQueryFromFile } from './readQueryFromFile.js';
import { validateAndTransformQuery } from './validateAndTransformQuery.js';

export async function getElasticQuery(file?: string) {
  const elasticQueryStr = file ? await readQueryFromFile(file) : await inquireElasticQuery();

  if (!elasticQueryStr) return;

  const elasticQuery = await validateAndTransformQuery(elasticQueryStr);

  return elasticQuery;
}
