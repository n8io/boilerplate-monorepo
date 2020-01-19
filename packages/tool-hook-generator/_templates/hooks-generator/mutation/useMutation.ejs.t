---
to: <%= outputDir %>/use<%=name %>.js
---
<%
  camelName = h.changeCase.camel(name, true)
  constant = 'MUTATION_' + h.changeCase.constant(name) 
-%>
import { gql } from '@apollo/client';
import { useMutation } from '../useMutation';

const <%= constant %> = gql`
  mutation <%= camelName %><%= h.toArgDeclarations(camelName) %> {
    <%= camelName %><%= h.toArgs(camelName) %><%= h.toTypeFields(camelName) %>
  }
`;
<%= h.toInputInfo(camelName) %>
const use<%= name %> = options => useMutation(<%= constant %>, options);

export { use<%= name %> };
