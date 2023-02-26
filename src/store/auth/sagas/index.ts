import { watchLogin } from './watchLogin';
import { watchUpdateProfile } from './watchUpdateProfile';

export const authSagas = [watchLogin, watchUpdateProfile];
