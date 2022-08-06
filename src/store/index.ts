import { configureStore } from "@reduxjs/toolkit";
import userReducer, { setUserStore } from "./userStore";

export { setUserStore };

const store = configureStore({
    reducer: {
        user: userReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export default store;
