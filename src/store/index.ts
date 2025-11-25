import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./usersSlice";
import searchReducer from "./searchSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    search: searchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
