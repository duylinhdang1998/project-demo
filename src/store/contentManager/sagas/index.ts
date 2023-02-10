import { watchGetContent } from './watchGetContent';
import { watchUpdateContent } from './watchUpdateContent';

export const contentManagerSagas = [watchGetContent, watchUpdateContent];
