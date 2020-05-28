---
to: <%= outputDir %>/use<%= name %>.spec.js
---
<%
  constant = 'QUERY_' + h.changeCase.constant(name)
  hookName = 'use' + name
-%>
import * as UseQuery from '../useQuery';
import { <%= constant %>, <%= hookName %> } from './<%= hookName %>';

describe('<%= hookName %>', () => {
  const options = { option: 'OPTION' };
  let useQuery = null;

  beforeEach(() => {
    useQuery = td.replace(UseQuery, 'useQuery');
  });

  test('should pass along the proper parameters to useQuery', () => {
    <%= hookName %>(options);

    td.verify(useQuery(<%= constant %>, options));
  });
});
