import { uiToApi } from './transforms';

const uiExample = (number = '+2223334444') => uiToApi(number);

const apiExample = uiExample;

export { apiExample, uiExample };
