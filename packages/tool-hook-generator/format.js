const fs = require('fs');
const path = require('path');
const R = require('ramda');
const { promisify } = require('util');

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

const SCHEMA_JSON_PATH = path.join(__dirname, '../../.graphql/schema.json');

const updateCacheControlScope = R.evolve({
  description: R.always('The cache control scope enumeration'),
  enumValues: R.pipe(
    R.sort(R.ascend(R.prop('name'))),
    R.map((val) => ({
      ...val,
      description: `The ${val.name.toLowerCase()} cache control scope`,
    }))
  ),
});

const updateRootQuery = R.evolve({
  fields: R.sort(R.ascend(R.prop('name'))),
});

const removeUnusedUpload = R.reject(R.propEq('name', 'Upload'));

const applyFixes = (name, updater) => (types) => {
  const selector = R.propEq('name', name);
  const type = R.find(selector, types);
  const newTypes = R.reject(selector, types);
  const newType = updater(type);

  return [...newTypes, newType];
};

const main = async () => {
  const data = await readFileAsync(SCHEMA_JSON_PATH);
  const schemaObj = JSON.parse(data);

  const evolved = R.evolve({
    __schema: {
      types: R.pipe(
        applyFixes('CacheControlScope', updateCacheControlScope),
        applyFixes('Query', updateRootQuery),
        removeUnusedUpload
      ),
    },
  })(schemaObj);

  await writeFileAsync(SCHEMA_JSON_PATH, JSON.stringify(evolved, null, 2));
};

main();
