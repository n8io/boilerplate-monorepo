import td from 'testdouble';
import tdJest from 'testdouble-jest';

tdJest(td);

global.td = td;

afterEach(() => {
  jest.clearAllMocks();
  td.reset();
});
