import { GetContent } from 'services/ContentManager/Company/getContent';
import { Content } from 'services/models/Content';

export interface GetContentRequest extends GetContent {}

export interface GetContentSuccess {
  data: Content;
}

export interface GetContentFailure {}
