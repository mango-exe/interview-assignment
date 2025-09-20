import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slices/auth-slice'
import invoiceReducer from './slices/invoice-slice'
import errorReducer from './slices/error-slice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    invoice: invoiceReducer,
    error: errorReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
