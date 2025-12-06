import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./appReducer";
import toastReducer from "./toastReducer";

const store = configureStore({
    reducer: {
        app: appReducer,
        toast: toastReducer
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;