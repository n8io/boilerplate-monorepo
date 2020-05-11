import { constantCase, paramCase } from 'change-case';
import { join, keys, map, pipe, reduce, toPairs } from 'ramda';
import { css } from 'styled-components/macro';

const toName = (key) => `--${key}`;

const toCustomPropertyDefinition = (key, value) => `${toName(key)}: ${value};`;
const toCustomPropertyReference = (key) => `var(${toName(key)})`;

const toEnum = pipe(
  keys,
  map((key) => ({
    [constantCase(key)]: toCustomPropertyReference(paramCase(key)),
  })),
  reduce(
    (acc, item) => ({
      ...acc,
      ...item,
    }),
    {}
  )
);

const toCustomPropertyDefinitions = pipe(
  toPairs,
  map(([key, value]) => toCustomPropertyDefinition(paramCase(key), value)),
  join('\n')
);

const toStyles = (customPropertyMap) => css`
  ${toCustomPropertyDefinitions(customPropertyMap)}
`;

export const toCustomProperties = (customPropertyMap) => ({
  CustomProperty: toEnum(customPropertyMap),
  styles: toStyles(customPropertyMap),
});
