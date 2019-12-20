import { assoc, curry, keys, reduce } from 'ramda';
import { isNullOrEmpty } from '../isNullOrEmpty';

const renameKeys = curry((keysMap, obj) =>
  isNullOrEmpty(obj)
    ? obj
    : reduce(
        (acc, key) => assoc(keysMap[key] || key, obj[key], acc),
        {},
        keys(obj)
      )
);

export { renameKeys };
