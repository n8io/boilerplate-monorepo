---
to: <%= outputDir %>/index.js
inject: true
append: true
skip_if: './use<%= name %>'
---
export * from './use<%= name %>';