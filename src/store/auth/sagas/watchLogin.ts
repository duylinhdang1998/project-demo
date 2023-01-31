import { put, takeLatest } from "redux-saga/effects";
import { getActionType } from "store/configureStore";
import { authActions } from "../authSlice";
function* handleLogin({
  payload,
}: ReturnType<typeof authActions.loginRequest>) {
  try {
    const { password, username } = payload;
    console.log(username, password);
    yield put(authActions.loginSuccess({ role: "admin", token: "" }));
  } catch {
    yield put(authActions.loginFailure({}));
  }
}

export function* watchLogin() {
  yield takeLatest(getActionType(authActions.loginRequest), handleLogin);
}
