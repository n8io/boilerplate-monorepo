import { initial } from './creation';
import { Enumeration } from './typedef';

export const example = () => ({
  clearTheme: () => null,
  theme: {
    [Enumeration.PROP_NAME]: initial,
  },
  updateTheme: () => null,
});
