import { configureStore } from "@reduxjs/toolkit";
import userReducer, { setUserStore, setTheme } from "./userStore";

export { setUserStore, setTheme };

const store = configureStore({
    reducer: {
        user: userReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export default store;
