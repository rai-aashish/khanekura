import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/userSlice";
// import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { resourcesApi, userApi } from "./apiStore";

export const store = configureStore({
  reducer: {
    user: userReducer,
    [userApi.reducerPath]: userApi.reducer,
    [resourcesApi.reducerPath]: resourcesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});

//necessary for refetch on refocus / reconnect
// setupListeners(store.dispatch)
