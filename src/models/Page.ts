import { RouteObject } from 'react-router-dom';

export interface Page extends RouteObject {
  roles?: string[];
}
