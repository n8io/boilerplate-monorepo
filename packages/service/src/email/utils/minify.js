import { minify as normalizeHtml } from 'html-minifier';

const minifierOptions = {
  collapseWhitespace: true,
  minifyCSS: true,
  preserveLineBreaks: false,
  removeComments: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeTagWhitespace: true,
  sortAttributes: true,
  userShortDocType: true,
};

const minify = (html, overrides) =>
  normalizeHtml(html, { ...minifierOptions, ...overrides });

export { minify };
