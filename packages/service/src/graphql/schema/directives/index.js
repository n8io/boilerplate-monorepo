import * as hasPermission from './hasPermission';
import * as isAuthenticated from './isAuthenticated';

const directives = {
  hasPermission: hasPermission.directive,
  isAuthenticated: isAuthenticated.directive,
};

const typeDefs = [hasPermission.typeDefs, isAuthenticated.typeDefs];

export { directives, typeDefs };
