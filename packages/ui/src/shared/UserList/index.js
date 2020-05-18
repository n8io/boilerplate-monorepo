import { UserSnapshot } from '@boilerplate-monorepo/common';
import { arrayOf } from 'prop-types';
import React from 'react';
import { NoData } from 'shared/NoData';
import styled from 'styled-components';
import { CustomProperty } from 'types/customProperties';

const Container = styled.div`
  align-items: start;
  display: block;
  font-family: ${CustomProperty.FONT_MONO}, monospace;
  height: 100%;
  justify-content: start;
  justify-items: start;
  row-gap: 1rem;
`;

const Cell = styled.div`
  align-items: center;
  display: grid;
  line-height: 2rem;
  min-height: calc(${CustomProperty.BASE_UNIT} * 2);
  overflow-x: hidden;
  text-overflow: ellipsis;
  user-select: all;
  white-space: nowrap;
`;

const Row = styled.div`
  border-left: 1px solid ${CustomProperty.CUSTOM_BORDER_COLOR};
  border-right: 1px solid ${CustomProperty.CUSTOM_BORDER_COLOR};
  border-top: 1px solid ${CustomProperty.CUSTOM_BORDER_COLOR};
  display: grid;
  column-gap: 0.5rem;
  grid-template-columns: 5rem 10rem 1fr;
  padding: 0 calc(${CustomProperty.BASE_UNIT} * 0.5);
  width: 100%;

  &:last-child {
    border: 1px solid ${CustomProperty.CUSTOM_BORDER_COLOR};
  }
`;

const toRow = (user) => (
  <Row key={user.id}>
    <Cell>{user.role}</Cell>
    <Cell>{user.username}</Cell>
    <Cell>{`${user.givenName} ${user.familyName}`}</Cell>
  </Row>
);

const UserList = ({ users }) => {
  return (
    <Container>
      {users && users.length > 0 ? users.map(toRow) : <NoData />}
    </Container>
  );
};

UserList.propTypes = {
  users: arrayOf(UserSnapshot.propTypes).isRequired,
};

export { UserList };
