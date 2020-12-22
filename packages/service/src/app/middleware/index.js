import { middleware as cookieParser } from './cookieParser';
import { middleware as helmet } from './helmet';

const middlewares = [cookieParser, helmet];

export { middlewares };
