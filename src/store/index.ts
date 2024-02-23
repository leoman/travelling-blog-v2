import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';


import { postsApi } from './posts/api';
import { tripsApi } from './trips/api';

const rootReducer = combineReducers({
  [postsApi.reducerPath]: postsApi.reducer,
  [tripsApi.reducerPath]: tripsApi.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tripsApi.middleware, postsApi.middleware)
});

setupListeners(store.dispatch);

export {
  store,
}

export * from "./posts"
export * from "./trips"

export type RootState = ReturnType<typeof rootReducer>;