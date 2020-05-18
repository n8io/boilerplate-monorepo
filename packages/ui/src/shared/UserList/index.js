import { UserSnapshot } from '@boilerplate-monorepo/common';
import { arrayOf } from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { CustomProperty } from 'types/customProperties';

const Container = styled.div`
  align-items: start;
  display: block;
  font-family: monospace;
  justify-content: start;
  justify-items: start;
  row-gap: 1rem;
`;

const Cell = styled.div`
  align-items: center;
  display: inline-block;
  line-height: 2rem;
  margin: 0.25rem;
  min-height: calc(${CustomProperty.BASE_UNIT} * 2);
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Row = styled.div`
  border-left: 1px solid ${CustomProperty.CUSTOM_BORDER_COLOR};
  border-right: 1px solid ${CustomProperty.CUSTOM_BORDER_COLOR};
  border-top: 1px solid ${CustomProperty.CUSTOM_BORDER_COLOR};
  display: grid;
  column-gap: 0.5rem;
  grid-template-columns: 3rem 4rem 1fr;
  width: 100%;

  &:last-child {
    border: 1px solid ${CustomProperty.CUSTOM_BORDER_COLOR};
  }
`;

const toRow = (user) => (
  <Row key={user.id}>
    <Cell>{user.id}</Cell>
    <Cell>{user.role}</Cell>
    <Cell>{`${user.givenName} ${user.familyName}`}</Cell>
  </Row>
);

const UserList = ({ users }) => {
  return <Container>{users.map(toRow)}</Container>;
};

UserList.propTypes = {
  users: arrayOf(UserSnapshot.propTypes).isRequired,
};

export { UserList };
