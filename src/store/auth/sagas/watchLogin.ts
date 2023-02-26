import { put, retry, SagaReturnType, takeLatest } from 'redux-saga/effects';
import { login } from 'services/Auth/Company/login';
import { getProfile } from 'services/Company/getProfile';
import { authActions } from '../authSlice';
function* handleLogin({ payload }: ReturnType<typeof authActions.loginRequest>) {
  const { password, email, onFailure, onSuccess } = payload;
  try {
    const loginResponse: SagaReturnType<typeof login> = yield retry(3, 1000, login, {
      email,
      password,
    });
    const token = `${loginResponse.data.payload.type} ${loginResponse.data.payload.rbacToken}`;
    const profileResponse: SagaReturnType<typeof getProfile> = yield retry(3, 1000, getProfile, { token });
    yield put(
      authActions.loginSuccess({
        role: loginResponse.data.rbacCompany.role === 'COMPANY_ADMIN' ? 'admin' : 'agent',
        token,
        profile: profileResponse.data,
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
