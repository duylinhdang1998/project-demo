import { all, call, delay, spawn } from 'redux-saga/effects';
import { authSagas } from './auth/sagas';
import { contentManagerSagas } from './contentManager/sagas';
import { officesManagerSagas } from './officesManager/sagas';
import { packageSettingsSagas } from './packageSettings/sagas';
import { profileSagas } from './profile/sagas';
import { routesSagas } from './routes/sagas';
import { staffsSagas } from './staffs/sagas';
import { subscriptionsSagas } from './subscriptions/sagas';
import { vehicleEventsSagas, vehiclesSagas } from './vehicles/sagas';

const sagas = [
  ...authSagas,
  ...officesManagerSagas,
  ...packageSettingsSagas,
  ...subscriptionsSagas,
  ...contentManagerSagas,
  ...vehiclesSagas,
  ...vehicleEventsSagas,
  ...routesSagas,
  ...staffsSagas,
  ...profileSagas,
];

// https://github.com/redux-saga/redux-saga/issues/760#issuecomment-273737022
const makeRestartable = (saga: any) => {
  return function* () {
    yield spawn(function* () {
      while (true) {
        try {
          yield call(saga);
          console.error('unexpected root saga termination. The root sagas are supposed to be sagas that live during the whole app lifetime!', saga);
        } catch (e) {
          console.error('Saga error, the saga will be restarted', e);
        }
        yield delay(1000); // Avoid infinite failures blocking app TODO use backoff retry policy...
      }
    });
  };
};

const rootSagas = sagas.map(makeRestartable);

export default function* root() {
  yield all(rootSagas.map(call));
}
