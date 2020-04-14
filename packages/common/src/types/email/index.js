import { apiExample, uiExample } from './examples';
import { apiToMasked, uiToApi } from './transforms';
import { Limits, validationSchema } from './validation';

const Email = {
  Limits,
  apiExample,
  apiToMasked,
  uiExample,
  uiToApi,
  validationSchema,
};

export { Email };
