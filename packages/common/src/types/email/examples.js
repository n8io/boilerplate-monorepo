import { uiToApi } from './transforms';

const uiExample = (email = 'USER@DOMAIN.COM') => uiToApi(email);

const apiExample = uiExample;

export { apiExample, uiExample };
