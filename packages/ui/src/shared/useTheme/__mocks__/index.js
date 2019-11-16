import { Theme } from 'types/theme';

export const useTheme = () => ({
  theme: Theme.initial,
  updateTheme: jest.fn().mockName('updateTheme'),
});
