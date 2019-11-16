import { language } from './extracted/language';
import { theme } from './extracted/theme';

export const shared = {
  toggles: {
    ...language,
    ...theme,
    availableLanguages: 'Available Languages',
    chooseALanguage: 'Choose a language',
    languages: language,
    layout: 'Layout',
    setLanguage: 'Set language to {{language}}',
    theme: 'Theme',
  },
};
