import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import reduxReducer from './reduxSlice';
import thunk from 'redux-thunk';

export const store = configureStore({
  reducer: {
    reduxStore: reduxReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      //   serializableCheck: {
      //     ignoredActions: [
      //       'auth/changeFieldKeyAction',
      //       'auth/changeVaultKeyAction',
      //     ],
      //     ignoredPaths: ['auth.vaultKey', 'auth.fieldKey'],
      //   },
    }),
});
