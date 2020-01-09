import { UserRole } from 'types/userRole';

export interface UserContext {
  email: string;
  id: string;
  role: UserRole;
  username: string;
}
