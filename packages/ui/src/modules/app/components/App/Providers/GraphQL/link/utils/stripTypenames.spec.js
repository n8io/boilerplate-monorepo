import { stripTypenames } from './stripTypenames';

describe('strip typenames', () => {
  test('strip type names removes typenames recursively', () => {
    const typename = '__typename';
    const fn = () => null;
    const obj = {
      array: [1, 2, 3],
      deep: {
        thing: 1,
        [typename]: 'TYPENAME',
      },
      delayPeriod: 10,
      fn,
      holdPeriod: 0,
      isTime: false,
      numberCycles: 1,
      objArray: [{ a: 1, [typename]: 'TYPENAME' }],
      samplePeriod: 1,
      sampleVolume: {
        [typename]: 'TYPENAME',
        units: 'm^3',
        value: 1,
      },
      [typename]: 'TYPENAME',
    };

    expect(stripTypenames(obj)).toEqual({
      array: [1, 2, 3],
      deep: {
        thing: 1,
      },
      delayPeriod: 10,
      fn,
      holdPeriod: 0,
      isTime: false,
      numberCycles: 1,
      objArray: [
        {
          a: 1,
        },
      ],
      samplePeriod: 1,
      sampleVolume: {
        units: 'm^3',
        value: 1,
      },
    });
  });
});
