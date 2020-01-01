import { User } from 'entity/User';

const toSafeLog = ({ email, id, username }: User) => ({ email, id, username });

export { toSafeLog };
