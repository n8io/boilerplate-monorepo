import { node } from 'prop-types';
import styled from 'styled-components/macro';

const EllipsiedText = styled.div`
  display: inline;
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

EllipsiedText.propTypes = {
  children: node.isRequired,
};

export { EllipsiedText };
