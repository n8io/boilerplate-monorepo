import cors from 'cors';
import { Cors } from 'types/cors';

const middleware = cors(Cors.OPTIONS);

export { middleware };
