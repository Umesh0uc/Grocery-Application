import { createSlice } from "@reduxjs/toolkit";

export type appState = {
    page: string,
};

const initAppState: appState = {
    page: "home",
};

const appReducer = createSlice({
    name: "app",
    initialState: initAppState,
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload;
        },
    },
});

export const { setPage } = appReducer.actions;
export default appReducer.reducer;