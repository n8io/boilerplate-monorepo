import * as hasPermission from './hasPermission';
import * as isAuthenticated from './isAuthenticated';
import * as rateLimitBurst from './rateLimitBurst';
import * as rateLimitWindow from './rateLimitWindow';

const directives = {
  hasPermission: hasPermission.directive,
  isAuthenticated: isAuthenticated.directive,
  rateLimitBurst: rateLimitBurst.directive,
  rateLimitWindow: rateLimitWindow.directive,
};

const typeDefs = [
  hasPermission.typeDefs,
  isAuthenticated.typeDefs,
  rateLimitBurst.typeDefs,
  rateLimitWindow.typeDefs,
];

export { directives, typeDefs };
