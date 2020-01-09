import { UserContext } from 'types/userContext';
import { UserRole } from 'types/userRole';

export class RefreshToken implements UserContext {
  id: string;
  email: string;
  role: UserRole;
  tokenVersion: number;
  username: string;
}
