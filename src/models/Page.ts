import { RouteObject } from "react-router-dom";

export type Page = RouteObject & {
  roles?: string[];
};
