import { middleware as cookieParser } from './cookieParser';
import { middleware as cors } from './cors';
import { middleware as helmet } from './helmet';

const middlewares = [cors, cookieParser, helmet];

export { middlewares };
