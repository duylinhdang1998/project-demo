import { createSelector } from "reselect";
import { RootState } from "store/configureStore";

export const selectAuth = (state: RootState) => state.auth;
export const selectToken = createSelector(
  selectAuth,
  (authState) => authState.token
);
