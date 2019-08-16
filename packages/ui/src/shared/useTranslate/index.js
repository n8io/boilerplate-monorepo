import { useTranslation } from 'react-i18next';

export const useTranslate = ({ component, namespace }) => {
  const { t: originalT } = useTranslation(namespace);
  const t = (key, options) =>
    key && originalT([`${component}.${key}`, key], options);

  return t;
};
