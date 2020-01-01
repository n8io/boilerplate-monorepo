import { AccessToken } from '../accessToken';

export class RefreshToken implements AccessToken {
  id: string;
  email: string;
  tokenVersion: number;
  username: string;
}
