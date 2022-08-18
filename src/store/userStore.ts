import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        id: "",
        full_name: "",
        profile_picture: "",
        theme: "",
        is_initialized: false,
    },
    reducers: {
        setUserStore: (state, action) => {
            const res = action.payload;
            if (res) {
                const { id, full_name, profile_picture, theme } = res;
                state.id = id;
                state.full_name = full_name;
                state.profile_picture = profile_picture;
                state.theme = theme;
            }

            state.is_initialized = true;
        },
        setTheme: (state) => {
            state.theme === "Dark" ? (state.theme = "Light") : (state.theme = "Dark");
        },
    },
});

const { setUserStore, setTheme } = userSlice.actions;
export { setUserStore, setTheme };
export default userSlice.reducer;
