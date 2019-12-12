import { Theme } from '@boilerplate-monorepo/ui-common';

export const useTheme = () => ({
  theme: Theme.initial,
  updateTheme: jest.fn().mockName('updateTheme'),
});
