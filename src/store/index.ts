import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga';
import fighterReducer from "./Fighters";
import { watchFetchFighters } from "./Fighters/saga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    fighter: fighterReducer,
  },
  
  middleware: (getDefaultMiddleware) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getDefaultMiddleware().concat(sagaMiddleware as any),
});

sagaMiddleware.run(watchFetchFighters);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
