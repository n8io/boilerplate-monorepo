import { johnny } from '@puttingpoker/common';
import React from 'react';

const domTestId = 'Main';

const Main = () => <main data-testid={domTestId}>{johnny()}</main>;

export { domTestId, Main };
