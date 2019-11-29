import { css } from 'styled-components/macro';
import * as BaseSize from './baseSize';
import * as BaseUnit from './baseUnit';
import * as Custom from './custom';
import * as Font from './font';
import * as Grayscale from './grayscale';
import * as Layout from './layout';
import * as Link from './link';
import * as Roygbiv from './roygbiv';
import * as Transition from './transition';
import * as ZIndex from './zIndex';

const CustomProperty = {
  ...BaseSize.CustomProperty,
  ...BaseUnit.CustomProperty,
  ...Layout.CustomProperty,
  ...Grayscale.CustomProperty,
  ...Roygbiv.CustomProperty,
  ...Font.CustomProperty,
  ...Link.CustomProperty,
  ...Transition.CustomProperty,
  ...ZIndex.CustomProperty,
  ...Custom.CustomProperty,
};

const styles = css`
  :root {
    ${BaseSize.styles}
    ${BaseUnit.styles}
    ${Layout.styles}
    ${Grayscale.styles}
    ${Roygbiv.styles}
    ${Font.styles}
    ${Link.styles}
    ${Transition.styles}
    ${ZIndex.styles}
    ${Custom.styles}
  }
`;

export { CustomProperty, styles };
