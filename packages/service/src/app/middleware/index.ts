import { middleware as cors } from './cors';
import { middleware as cookieParser } from './cookieParser';

const middlewares = [cors, cookieParser];

export { middlewares };
