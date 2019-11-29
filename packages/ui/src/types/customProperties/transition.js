import { toCustomProperties } from './utils/customProperty';

const transitions = {
  TRANSITION_DELAY: '200ms',
  TRANSITION_TIMING_FUNCTION: 'ease',
};

const { CustomProperty, styles } = toCustomProperties(transitions);

export { CustomProperty, styles };
