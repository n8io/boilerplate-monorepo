import { evolve, head, keys, mergeRight, pipe, prop, __ } from 'ramda';

const toActualData = data => {
  if (!data) return data;

  return pipe(keys, head, prop(__, data))(data);
};

const toData = pipe(
  mergeRight({
    data: null,
  }),
  evolve({
    data: toActualData,
  })
);

export { toData };
