import { middleware as cookieParser } from './cookieParser';
import { middleware as cors } from './cors';

const middlewares = [cors, cookieParser];

export { middlewares };
