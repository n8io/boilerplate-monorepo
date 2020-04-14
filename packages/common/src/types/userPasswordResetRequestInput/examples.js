import { makeSafeExample } from '../utils/makeSafeExample';
import { Enumeration } from './typedef';

const apiExample = makeSafeExample({
  id: 'ID',
  notificationMethod: Enumeration.EMAIL,
});

const uiExample = apiExample;

export { apiExample, uiExample };
