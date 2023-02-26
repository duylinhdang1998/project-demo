import { put, retry, SagaReturnType, takeLatest } from 'redux-saga/effects';
import { login } from 'services/Auth/Company/login';
import { authActions } from '../authSlice';
function* handleLogin({ payload }: ReturnType<typeof authActions.loginRequest>) {
  const { password, email, onFailure, onSuccess } = payload;
  try {
    const { data }: SagaReturnType<typeof login> = yield retry(3, 1000, login, {
      email,
      password,
    });
    yield put(
      authActions.loginSuccess({
        role: data.rbacCompany.role === 'COMPANY_ADMIN' ? 'admin' : 'agent',
        token: `${data.payload.type} ${data.payload.rbacToken}`,
      }),
    );
    onSuccess();
  } catch (error) {
    console.log('watchLogin.ts', error);
    yield put(authActions.loginFailure({}));
    onFailure();
  }
}

export function* watchLogin() {
  yield takeLatest(authActions.loginRequest, handleLogin);
}
