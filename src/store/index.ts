import { configureStore } from "@reduxjs/toolkit";
import userReducer, { setUserStore, testColor, testTheme } from "./userStore";

export { setUserStore, testColor, testTheme };

const store = configureStore({
    reducer: {
        user: userReducer,
    },
});

export default store;
