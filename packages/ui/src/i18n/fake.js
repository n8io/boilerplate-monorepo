import { map, pipe } from 'ramda';

const characterMap = {
  0: '⓪',
  1: '①',
  2: '②',
  3: '③',
  4: '④',
  5: '⑤',
  6: '⑥',
  7: '⑦',
  8: '⑧',
  9: '⑨',
  A: 'Ā',
  B: 'Ḅ',
  C: 'Ç',
  D: 'Ḓ',
  E: 'Ę',
  F: '𝐹',
  G: 'Ǧ',
  H: 'Ĥ',
  I: '𝑰',
  J: 'Ĵ',
  K: 'Ķ',
  L: 'Ļ',
  M: 'Ṃ',
  N: 'Ṅ',
  O: 'Ő',
  P: 'ℙ',
  Q: 'ℚ',
  R: 'Ȓ',
  S: 'Ş',
  T: 'Ţ',
  U: 'Ũ',
  V: 'Ṽ',
  W: 'Ŵ',
  X: 'Ẍ',
  Y: 'Ȳ',
  Z: 'Ẑ',
  a: 'å',
  b: '𝒃',
  c: 'ç',
  d: 'ḓ',
  e: 'ë',
  f: '𝒇',
  g: 'ğ',
  h: 'ḧ',
  i: 'í',
  j: 'ĵ',
  k: 'ḱ',
  l: 'ľ',
  m: 'ṁ',
  n: 'ñ',
  o: 'ö',
  p: 'ṗ',
  q: '𝑞',
  r: 'ŕ',
  s: 'ṧ',
  t: 'ţ',
  u: 'ṹ',
  v: 'ṿ',
  w: 'ŵ',
  x: 'ẋ',
  y: 'ẙ',
  z: '𝒛',
};

const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi placerat faucibus velit, a
posuere arcu auctor feugiat. Duis laoreet elit non mauris aliquet venenatis. Donec ullamcorper velit in
consequat varius. Sed eu quam ultrices, eleifend risus a, faucibus neque. Suspendisse in tempus urna,
eget rhoncus elit. Nunc sit amet leo eu nisl facilisis sodales sit amet et urna. Proin eleifend diam vitae
urna commodo facilisis in sit amet nisl. Mauris non facilisis dui. Mauris gravida molestie eros. Ut
ullamcorper aliquet arcu ut hendrerit. Suspendisse ligula dui, eleifend quis arcu sit amet, ultrices
mattis nulla. Morbi sit amet interdum turpis. Phasellus consequat egestas enim, et tempus ipsum porttitor non.`
  .toLowerCase()
  .replace(/[^a-z ]/gu, '')
  .split(' ');

const transformStringToFake = str =>
  str.replace(/./gu, c => characterMap[c] || c);

const bumpLength = str => {
  const extendedLength = str.length * 1.4;
  let output = `${str}`;
  let index = 0;

  while (output.length < extendedLength) {
    output = `${output} ${lorem[index % lorem.length]}`;
    index += index + 1;
  }

  return output;
};

// eslint-disable-next-line max-statements
const transformTokenized = str => {
  // eslint-disable-next-line prefer-named-capture-group
  const regex = /\{\{[-]?\s*\w+([.]\w+)*\s*\}\}/gu;
  const subst = '~~token~~';

  let output = `${str}`;
  const tokens = str.match(regex);

  if (tokens && tokens.length) {
    // Bump length *after* removing tokens
    const bumped = bumpLength(output.replace(regex, subst));

    // Remove tokenized pieces and split into array
    const tokenizedStr = bumped.split(subst);

    // Replace chars of non-tokenized bits
    const fakedWithTokenPlaceholders = map(transformStringToFake, tokenizedStr);

    // Reinsert tokens at proper indexes
    output = fakedWithTokenPlaceholders
      .reduce((acc, ftwp, index) => [...acc, ftwp, tokens[index]], [])
      .join('');
  } else {
    output = pipe(
      bumpLength,
      transformStringToFake
    )(output);
  }

  return output;
};

export const fakeLang = 'dev';

export const transformFake = str => `[${transformTokenized(str)}]`;
