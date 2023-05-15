import { DisplayUser } from "./DisplayUser";

export interface DecodedJwt {
  user: DisplayUser;
  exp: number;
  iat: number;
}
