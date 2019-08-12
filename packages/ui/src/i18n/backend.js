import { always, curry, ifElse, is, map, pipeWith, then, useWith } from 'ramda';
import { fakeLang, transformFake } from './fake';

const loadTranslation = (language, namespace) =>
  // eslint-disable-next-line import/dynamic-import-chunkname
  import(
    /* webpackChunkName: "i18n-[request]" */
    `i18n/${language}/${namespace}`
  ).then(module => module[namespace]);

const recursiveMap = curry((fn, obj) =>
  ifElse(is(Object), map(recursiveMap(fn)), fn)(obj)
);

const loadFakeTranslation = pipeWith(then, [
  useWith(loadTranslation, [always('en')]),
  recursiveMap(transformFake),
]);

export const backend = {
  async read(language, namespace, callback) {
    try {
      const reader =
        language === fakeLang ? loadFakeTranslation : loadTranslation;
      const translation = await reader(language, namespace);

      return callback(null, translation);
    } catch (e) {
      return callback(
        `Unknown language ${language} or namespace ${namespace}`,
        false
      );
    }
  },
  type: 'backend',
};
