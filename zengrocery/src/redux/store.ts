import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./appReducer";
import toastReducer from "./toastReducer";
import cartReducer from "./cartReducer";

const store = configureStore({
    reducer: {
        app: appReducer,
        toast: toastReducer,
        cart: cartReducer
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;