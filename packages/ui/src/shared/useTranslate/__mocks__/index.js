export const useTranslate = _options => (name, values) =>
  values ? `t(${name}, ${JSON.stringify(values)})` : `t(${name})`;
