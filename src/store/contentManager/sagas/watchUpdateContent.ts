import { put, retry, SagaReturnType, takeLatest } from 'redux-saga/effects';
import { updateContent } from 'services/ContentManager/Company/updateContent';
import { contentManagerActions } from '../contentManagerSlice';

function* handleUpdateContent({ payload }: ReturnType<typeof contentManagerActions.updateContentRequest>) {
  const { data } = payload;
  try {
    const response: SagaReturnType<typeof updateContent> = yield retry(3, 1000, updateContent, { data });
    yield put(contentManagerActions.updateContentSuccess({ data: response.data }));
  } catch (error) {
    console.log('watchUpdateContent', error);
    yield put(contentManagerActions.updateContentFailure);
  }
}

export function* watchUpdateContent() {
  yield takeLatest(contentManagerActions.updateContentRequest, handleUpdateContent);
}
