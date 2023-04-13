import { UpdateContent } from 'services/ContentManager/Company/updateContent';
import { Content } from 'services/models/Content';

export interface UpdateContentRequest extends UpdateContent {
  onSuccess: () => void;
  onFailure: OnFailureWithMessageOfStatusCode;
}

export interface UpdateContentSuccess {
  data: Content;
}

export interface UpdateContentFailure {}
