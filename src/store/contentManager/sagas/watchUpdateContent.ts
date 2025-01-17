import { call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';
import { updateContent } from 'services/ContentManager/Company/updateContent';
import { ServiceException } from 'services/utils/ServiceException';
import { contentManagerActions } from '../contentManagerSlice';

function* handleUpdateContent({ payload }: ReturnType<typeof contentManagerActions.updateContentRequest>) {
  const { data, onSuccess, onFailure } = payload;
  try {
    const response: SagaReturnType<typeof updateContent> = yield call(updateContent, { data });
    console.log('response>>>>>>', response);
    yield put(contentManagerActions.updateContentSuccess({ data: response.data }));
    onSuccess();
  } catch (error) {
    console.log('watchUpdateContent', error);
    yield put(contentManagerActions.updateContentFailure);
    onFailure(ServiceException.getMessageError(error));
  }
}

export function* watchUpdateContent() {
  yield takeLatest(contentManagerActions.updateContentRequest, handleUpdateContent);
}
