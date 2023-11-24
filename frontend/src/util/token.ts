import { Role } from '../types/role';
import jwtDecode from 'jwt-decode';
import { getAuthData } from './storage';

export type TokenData = {
  exp: number;
  user_name: string;
  authorities: Role[];
};

export const getTokenData = (): TokenData | undefined => {
  const loginResponse = getAuthData();
  try {
    return jwtDecode(loginResponse.access_token);
  } catch (error) {
    return undefined;
  }
};
