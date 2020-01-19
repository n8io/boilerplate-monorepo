---
to: <%= outputDir %>/use<%=name %>.js
---
<%
  camelName = h.changeCase.camel(name, true)
  constant = 'QUERY_' + h.changeCase.constant(name) 
-%>
import { gql } from '@apollo/client';
import { useQuery } from '../useQuery';

export const <%= constant %> = gql`
  query <%= camelName %> {
    <%= camelName %><%= h.toTypeFields(camelName) %>
  }
`;

const use<%= name %> = options => useQuery(<%= constant %>, options);

export { use<%= name %> };
