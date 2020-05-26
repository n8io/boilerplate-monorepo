import '@testing-library/jest-dom/extend-expect';
import 'jest-localstorage-mock';
import td from 'testdouble';
import tdJest from 'testdouble-jest';

tdJest(td);

global.td = td;

afterEach(() => {
  jest.clearAllMocks();
  td.reset();
});
