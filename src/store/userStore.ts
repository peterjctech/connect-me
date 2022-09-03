import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user_id: "",
        full_name: "",
        profile_picture: "",
        theme: "",
        color: "",
        is_initialized: false,
    },
    reducers: {
        setUserStore: (state, action) => {
            const res = action.payload;
            if (res) {
                const { user_id, full_name, profile_picture, theme } = res;
                state.user_id = user_id;
                state.full_name = full_name;
                state.profile_picture = profile_picture;
                state.theme = theme;
            }

            state.is_initialized = true;
        },
        testTheme: (state) => {
            switch (state.theme) {
                case "Light":
                    state.theme = "Void";
                    break;
                case "Void":
                    state.theme = "Dark";
                    break;
                default:
                    state.theme = "Light";
                    break;
            }
        },
        testColor: (state) => {
            switch (state.color) {
                case "Blue":
                    state.color = "Purple";
                    break;
                case "Purple":
                    state.color = "Red";
                    break;
                case "Red":
                    state.color = "Green";
                    break;
                default:
                    state.color = "Blue";
                    break;
            }
        },
    },
});

const { setUserStore, testTheme, testColor } = userSlice.actions;
export { setUserStore, testColor, testTheme };
export default userSlice.reducer;
