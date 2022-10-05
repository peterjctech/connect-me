import { configureStore } from "@reduxjs/toolkit";
import userReducer, { testTheme, testColor, setUserStore } from "./userStore";

export { testTheme, testColor, setUserStore };

const store = configureStore({
    reducer: {
        user: userReducer,
    },
});

export default store;
