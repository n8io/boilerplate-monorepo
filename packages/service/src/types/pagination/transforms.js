import { Utils } from '@boilerplate-monorepo/common';
import { defaultTo, last, map, pipe, split, unless } from 'ramda';
import { Enumeration } from './typedef';

const Encoding = {
  ASCII: 'ascii',
  BASE64: 'base64',
};

const defaultToNull = defaultTo(null);

const base64Encode = unless(Utils.isNullOrEmpty, clearText =>
  Buffer.from(clearText).toString(Encoding.BASE64)
);

const base64Decode = unless(Utils.isNullOrEmpty, encodedText =>
  Buffer.from(encodedText, Encoding.BASE64).toString(Encoding.ASCII)
);

const cursorToAfter = pipe(
  defaultToNull,
  base64Decode,
  unless(Utils.isNullOrEmpty, split(Enumeration.DELIMITER))
);

const nodesToPaginatedResults = (nodes, pagination, nodeToCursor) => {
  const { hasMore: hasNextPage, rowCount: total } = pagination;
  const lastNode = last(nodes);
  const transformCursor = pipe(defaultToNull, nodeToCursor, base64Encode);

  const edges = map(
    node => ({
      cursor: transformCursor(node),
      node,
    }),
    nodes
  );

  const pageInfo = {
    endCursor: transformCursor(lastNode),
    hasNextPage,
    total,
  };

  return {
    edges,
    pageInfo,
  };
};

export { cursorToAfter, nodesToPaginatedResults };
