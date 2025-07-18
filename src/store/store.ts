import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Uses localStorage
import { baseApi } from './api/baseApi';



const persistConfig = {
  key: "auth",
  storage,
};


const persistedReducer = persistReducer(persistConfig, userReducer);
export const store = configureStore({
  reducer: {
    user: persistedReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
 middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});


export const persistor = persistStore(store);


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
