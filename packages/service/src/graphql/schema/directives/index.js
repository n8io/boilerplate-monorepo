import * as hasPermission from './hasPermission';
import * as isAuthenticated from './isAuthenticated';
import * as rateLimitBurst from './rateLimitBurst';
import * as rateLimitUsername from './rateLimitUsername';
import * as rateLimitWindow from './rateLimitWindow';

const directives = {
  hasPermission: hasPermission.directive,
  isAuthenticated: isAuthenticated.directive,
  rateLimitBurst: rateLimitBurst.directive,
  rateLimitUsername: rateLimitUsername.directive,
  rateLimitWindow: rateLimitWindow.directive,
};

const typeDefs = [
  hasPermission.typeDefs,
  isAuthenticated.typeDefs,
  rateLimitBurst.typeDefs,
  rateLimitUsername.typeDefs,
  rateLimitWindow.typeDefs,
];

export { directives, typeDefs };
