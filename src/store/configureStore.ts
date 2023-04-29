import { configureStore } from '@reduxjs/toolkit';
import { Middleware, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import env from 'env';
import rootReducers from 'store/rootReducers';
import rootSaga from 'store/rootSagas';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'packageSales'],
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
