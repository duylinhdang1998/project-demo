import { call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';
import { login } from 'services/Auth/Company/login';
import { ServiceException } from 'services/utils/ServiceException';
import { authActions } from '../authSlice';
import { UserRole } from 'utils/constant';
function* handleLogin({ payload }: ReturnType<typeof authActions.loginRequest>) {
  const { password, email, onFailure, onSuccess } = payload;
  try {
    const { data }: SagaReturnType<typeof login> = yield call(login, {
      email,
      password,
    });
    yield put(
      authActions.loginSuccess({
        role: data.rbacCompany.role === 'COMPANY_ADMIN' ? UserRole.ADMIN : UserRole.AGENT,
        token: `${data.payload.type} ${data.payload.rbacToken}`,
      }),
    );
    onSuccess();
  } catch (error) {
    console.log('watchLogin.ts', error);
    yield put(authActions.loginFailure({}));
    onFailure(ServiceException.getMessageError(error));
  }
}

export function* watchLogin() {
  yield takeLatest(authActions.loginRequest, handleLogin);
}
