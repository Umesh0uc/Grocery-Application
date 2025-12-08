import { createSlice } from "@reduxjs/toolkit";

export type toastState = {
    show: boolean,
    message: string
};

const initState: toastState = {
    show: false,
    message: ''
};

const toastSlice = createSlice({
    name: "toast",
    initialState: initState,
    reducers: {
        toast: (state, action) => {
            state.show = true;
            state.message = action.payload;
        },
        destroyToast: (state, action) => {
            state.show = false;
            state.message = '';
        }
    }
});

export const { toast, destroyToast } = toastSlice.actions;
export default toastSlice.reducer; 