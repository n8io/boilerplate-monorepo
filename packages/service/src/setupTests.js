import { all } from 'ramda';
import td from 'testdouble';
import tdJest from 'testdouble-jest';
import { DateTime } from 'types/dateTime';

tdJest(td);

global.td = td;

expect.extend({
  toBeBetween,
});

afterEach(() => {
  jest.clearAllMocks();
  td.reset();
});

function toBeBetween(actual, start, end) {
  const receivedDate = DateTime.toSafeDate(actual);
  const startDate = DateTime.toSafeDate(start);
  const endDate = DateTime.toSafeDate(end);

  const areAllDatesProvided = all(Boolean)([receivedDate, startDate, endDate]);

  if (!areAllDatesProvided) {
    return {
      actual,
      message: () =>
        'The `toBeBetween` matchers requires a valid before and after dates',
      pass: false,
    };
  }

  const pass = startDate <= receivedDate && receivedDate <= endDate;

  const message = pass
    ? () => `${this.utils.matcherHint(
        'toBeDateBetween'
      )}\n\nExpected date to not be between ${this.utils.printExpected(
        startDate.toISOString()
      )} and ${this.utils.printExpected(endDate.toISOString())}
    Received ${this.utils.printReceived(receivedDate.toISOString())}`
    : () => `${this.utils.matcherHint(
        'toBeDateBetween'
      )}\n\nExpected a date to be between ${this.utils.printExpected(
        startDate.toISOString()
      )} and ${this.utils.printExpected(endDate.toISOString())}
    Received ${this.utils.printReceived(receivedDate.toISOString())}`;

  return { actual: receivedDate, message, pass };
}
