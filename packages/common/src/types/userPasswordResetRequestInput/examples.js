import { Utils } from 'utils';
import { Enumeration } from './typedef';

const apiExample = Utils.makeSafeExample({
  id: 'ID',
  notificationMethod: Enumeration.EMAIL,
});

const uiExample = apiExample;

export { apiExample, uiExample };
