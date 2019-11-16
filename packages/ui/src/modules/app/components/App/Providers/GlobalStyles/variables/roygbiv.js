import { css } from 'styled-components/macro';
import { Color } from 'types/color';

export const styles = css`
  --color-type-error: ${Color.ERROR};
  --color-type-info: ${Color.INFO};
  --color-type-primary: ${Color.PRIMARY};
  --color-type-primary-dark: ${Color.PRIMARY_DARK};
  --color-type-primary-light: ${Color.PRIMARY_LIGHT};
  --color-type-success: ${Color.SUCCESS};
  --color-type-warn: ${Color.WARN};

  --nav-link-background-color: var(--grayscale-white);
  --nav-link-background-color-hover: var(--color-type-primary-light);
  --nav-link-color: var(--color-type-primary);
  --nav-link-color-hover: var(--color-type-primary-dark);

  --link-background-color: var(--grayscale-white);
  --link-color: var(--color-type-primary);
  --link-color-hover: var(--color-type-primary-dark);
`;
