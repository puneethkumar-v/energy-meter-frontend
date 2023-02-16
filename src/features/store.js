import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./slice";

export default configureStore({
  reducer: {
    auth: AuthReducer,
  },
});
