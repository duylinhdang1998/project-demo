import { Middleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import rootSaga from 'store/rootSagas';
import rootReducers from 'store/rootReducers';
import { configureStore } from '@reduxjs/toolkit';
import env from 'env';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

const sagaMiddleware = createSagaMiddleware();
const reducers = persistReducer(
  persistConfig,
  combineReducers({
    ...rootReducers,
  }),
);
const middlewares: Middleware[] = [sagaMiddleware];
if (env.isDevMode) {
  middlewares.push(logger);
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
