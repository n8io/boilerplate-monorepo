import { css } from 'styled-components/macro';

export const styles = css`
  --layout-size: 1.125;
  --layout-base-unit: calc(var(--layout-size) * 1rem);
  --layout-header-height: calc(var(--layout-base-unit) * 2.75);
  --layout-main-header-height: calc(var(--layout-base-unit) * 2.75);
  --layout-main-breadcrumb-height: calc((var(--layout-base-unit) * 2) - 1px);
  --layout-main-footer-height: calc(var(--layout-base-unit) * 2.25);
`;
