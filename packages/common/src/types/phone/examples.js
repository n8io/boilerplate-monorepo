import { uiToApi } from './transforms';

const uiExample = (number = '+12223334444') => uiToApi(number);

const apiExample = uiExample;

export { apiExample, uiExample };
