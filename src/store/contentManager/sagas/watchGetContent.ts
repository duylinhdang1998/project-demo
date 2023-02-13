import { put, retry, SagaReturnType, takeLatest } from 'redux-saga/effects';
import { getContent } from 'services/ContentManager/Company/getContent';
import { contentManagerActions } from '../contentManagerSlice';

function* handleGetContent(_: ReturnType<typeof contentManagerActions.getContentRequest>) {
  try {
    const response: SagaReturnType<typeof getContent> = yield retry(3, 1000, getContent, {});
    yield put(contentManagerActions.getContentSuccess({ data: response.data }));
  } catch (error) {
    console.log('watchGetContent', error);
    yield put(contentManagerActions.getContentFailure);
  }
}

export function* watchGetContent() {
  yield takeLatest(contentManagerActions.getContentRequest, handleGetContent);
}
