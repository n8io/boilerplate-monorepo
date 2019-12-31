import { createConnection } from 'typeorm';

const connect = () => createConnection();

export { connect };
