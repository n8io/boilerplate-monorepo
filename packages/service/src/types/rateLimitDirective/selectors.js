import { log } from 'log';
import { prop } from 'ramda';
import { Telemetry } from 'types/telemetry';
import { RateLimitError } from '../customError';

// eslint-disable-next-line max-params
const onLimit = (resource, _directiveArgs, _obj, args, context, info) => {
  const { fieldName: query } = info;
  const input = prop('input', args);

  log.error(
    `Rate limit exceeded for ${query}. Try again in ${Math.ceil(
      resource.msBeforeNext / 1000
    )} second(s).`,
    {
      input,
      query,
      ...Telemetry.contextToLog(context),
      tags: {
        [Telemetry.Tag.COMPONENT]: Telemetry.Component.RATE_LIMITER,
        [Telemetry.Tag.MODULE]: Telemetry.Module.DIRECTIVE,
      },
    }
  );

  throw new RateLimitError(resource.msBeforeNext);
};

export { onLimit };
