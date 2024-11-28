import { AUTH_TYPE_KEY } from '../constants/auth.constants';
import { SetMetadata } from '@nestjs/common';
import { AuthType } from '../enums/auth-types.enum';

export const Auth = (...authType: AuthType[]) => {
  return SetMetadata(AUTH_TYPE_KEY, authType);
};
