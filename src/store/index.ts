import { configureStore } from "@reduxjs/toolkit";
import fighterReducer from "./Fighters";

export const store = configureStore({
  reducer: {
    fighter: fighterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
