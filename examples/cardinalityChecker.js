/* eslint-disable import/order */
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const data = require('./results.json');

const cardinalityKey = 'process_name';

const mySet = new Set(data.hits.hits.map((item) => item._source[cardinalityKey]));
const myArray = [...mySet];

console.log('Total documents count:', data.hits.hits.length);
console.log('Unique count:', myArray.length);
