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
        is_initialized: false,
    },
    reducers: {
        setUserStore: (state, action) => {
            const res = action.payload;
            if (res) {
                state._id = res._id;
                state.username = res.username;
                state.first_name = res.first_name;
                state.last_name = res.last_name;
                state.full_name = res.full_name;
                state.profile_picture = res.profile_picture;
                state.join_date = res.join_date;
                state.friends = res.friends;
                state.messages = res.messages;
                state.notifications = res.notifications;
                state.groups = res.groups;
                state.posts = res.posts;
                state.tags = res.tags;
                state.events = res.events;
                state.chat_notifs = res.chat_notifs;
                state.friend_count = res.friend_count;
            }

            state.is_initialized = true;
        },
    },
});

const { setUserStore } = userSlice.actions;
export { setUserStore };
export default userSlice.reducer;
