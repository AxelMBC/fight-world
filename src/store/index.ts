import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import fighterReducer from "./Fighters";
import mainEventsReducer from "./MainEvents";
import topEventsReducer from "./TopEvents";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    fighter: fighterReducer,
    mainEvents: mainEventsReducer,
    topEvents: topEventsReducer,
  },

  middleware: (getDefaultMiddleware) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getDefaultMiddleware().concat(sagaMiddleware as any),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
