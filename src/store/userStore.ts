import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user_id: "",
        full_name: "",
        profile_picture: "",
        friend_count: 0,
        joined_at: "",
        intro: "",
        birthday: "",
        age: 0,
        theme: "Light",
        color: "Blue",
        is_initialized: false,
    },
    reducers: {
        setUserStore: (state, action) => {
            if (action.payload) {
                const p = action.payload;
                state.theme = p.theme;
                state.color = p.color;
                state.user_id = p.user_id;
                state.profile_picture = p.profile_picture;
                state.full_name = p.full_name;
                state.intro = p.intro;
                state.age = p.age;
                state.birthday = p.birthday;
                state.friend_count = p.friend_count;
                state.joined_at = p.joined_at;
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
