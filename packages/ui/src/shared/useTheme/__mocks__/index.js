import { Theme } from 'types/theme';

export const useTheme = () => ({
  theme: Theme.example(),
  updateTheme: jest.fn().mockName('updateTheme'),
});
