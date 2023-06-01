import { configureStore } from '@reduxjs/toolkit';
import env from 'env';
import { Middleware, combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import rootReducers from 'store/rootReducers';
import rootSaga from 'store/rootSagas';

const sagaMiddleware = createSagaMiddleware();
const reducers = persistReducer(
  {
    key: 'root',
    storage,
    whitelist: ['auth'],
    migrate: state => {
      const { auth } = (state as RootState | undefined) ?? {};
      if (auth?.statusLogin === 'loading') {
        return Promise.resolve(undefined);
      }
      return Promise.resolve(state);
    },
  },
  combineReducers({
    ...rootReducers,
  }),
);
const middlewares: Middleware[] = [sagaMiddleware];
if (env.isDevMode) {
  // middlewares.push(logger);
}

const store = configureStore({
  reducer: reducers,
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({ serializableCheck: false }).concat(...middlewares);
  },
});
sagaMiddleware.run(rootSaga);
const persistor = persistStore(store as any);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store, persistor };
