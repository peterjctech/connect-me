import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        _id: "",
        username: "",
        first_name: "",
        last_name: "",
        full_name: "",
        profile_picture: "",
        join_date: "",
        friends: [],
        messages: [],
        notifications: [],
        groups: [],
        posts: [],
        tags: [],
        events: [],
        chat_notifs: [],
        friend_count: 0,
    },
    reducers: {},
});

export default userSlice.reducer;
