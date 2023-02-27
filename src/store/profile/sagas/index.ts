import { watchGetProfile } from './watchGetProfile';
import { watchUpdateProfile } from './watchUpdateProfile';

export const profileSagas = [watchGetProfile, watchUpdateProfile];
