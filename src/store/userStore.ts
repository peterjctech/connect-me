import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user_id: "",
        full_name: "",
        profile_picture: "",
        theme: "Light",
        color: "Blue",
        is_initialized: false,
    },
    reducers: {
        setUserStore: (state, action) => {
            if (action.payload) {
                const { theme, color, user_id, profile_picture, full_name } = action.payload;
                state.theme = theme;
                state.color = color;
                state.user_id = user_id;
                state.profile_picture = profile_picture;
                state.full_name = full_name;
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

const { testTheme, testColor, setUserStore } = userSlice.actions;
export { testTheme, testColor, setUserStore };
export default userSlice.reducer;
