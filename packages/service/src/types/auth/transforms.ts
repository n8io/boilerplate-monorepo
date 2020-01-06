import { User } from 'entity/User';
import { UserContext } from 'types/userContext';

const toSafeLog = ({ email, id, username }: User | UserContext) => ({
  email,
  id,
  username,
});

export { toSafeLog };
