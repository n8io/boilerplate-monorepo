---
to: <%= outputDir %>/use<%= name %>.spec.js
---
<%
  constant = 'MUTATION_' + h.changeCase.constant(name)
  hookName = 'use' + name
-%>
import * as UseMutation from '../useMutation';
import { <%= constant %>, <%= hookName %> } from './<%= hookName %>';

describe('<%= hookName %>', () => {
  const options = { option: 'OPTION' };
  let useMutation = null;

  beforeEach(() => {
    useMutation = td.replace(UseMutation, 'useMutation');
  });

  test('should pass along the proper parameters to useMutation', () => {
    <%= hookName %>(options);

    td.verify(useMutation(<%= constant %>, options));
  });
});
