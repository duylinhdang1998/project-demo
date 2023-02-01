import { put, takeLatest } from "redux-saga/effects";
import { getActionType } from "store/configureStore";
import { authActions } from "../authSlice";
function* handleLogin({
  payload,
}: ReturnType<typeof authActions.loginRequest>) {
  try {
    const { password, email } = payload;
    console.log(email, password);
    yield put(
      authActions.loginSuccess({
        role: email.includes("admin") ? "admin" : "agent",
        token: "TOKEN",
      })
    );
  } catch {
    yield put(authActions.loginFailure({}));
  }
}

export function* watchLogin() {
  yield takeLatest(getActionType(authActions.loginRequest), handleLogin);
}
