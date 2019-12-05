import '@testing-library/jest-dom/extend-expect';
import td from 'testdouble';
import tdJest from 'testdouble-jest';

tdJest(td);

global.td = td;
