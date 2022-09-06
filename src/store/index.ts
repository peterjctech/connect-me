import { configureStore } from "@reduxjs/toolkit";
import userReducer, { setUserStore, testColor, testTheme, updateUserStore } from "./userStore";

export { setUserStore, testColor, testTheme, updateUserStore };

const store = configureStore({
    reducer: {
        user: userReducer,
    },
});

export default store;
