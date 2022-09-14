import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user_id: "",
        full_name: "",
        profile_picture: "",
        friend_count: 0,
        join_date: "",
        theme: "",
        color: "",
        is_initialized: false,
    },
    reducers: {
        setUserStore: (state, action) => {
            if (action.payload) {
                const { user_id, full_name, profile_picture, theme, color, friend_count, join_date } = action.payload;
                state.user_id = user_id;
                state.full_name = full_name;
                state.profile_picture = profile_picture;
                state.friend_count = friend_count;
                state.join_date = join_date;
                state.theme = theme;
                state.color = color;
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
        updateUserStore: (state, action) => {
            const args = action.payload;
            if (args.user_id || args.user_id === "") state.user_id = args.user_id;
            if (args.full_name || args.full_name === "") state.full_name = args.full_name;
            if (args.profile_picture || args.profile_picture === "") state.profile_picture = args.profile_picture;
            if (args.theme || args.theme === "") state.theme = args.theme;
            if (args.color || args.color === "") state.color = args.color;
        },
    },
});

const { setUserStore, testTheme, testColor, updateUserStore } = userSlice.actions;
export { setUserStore, testColor, testTheme, updateUserStore };
export default userSlice.reducer;
