import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        _id: "",
        full_name: "",
        profile_picture: "",
        join_date: "",
        friends: [],
        messages: [],
        groups: [],
        posts: [],
        tags: [],
        events: [],
        notifications: [],
        chat_notifs: [],
        friend_count: 0,
        is_initialized: false,
    },
    reducers: {
        setUserStore: (state, action) => {
            const res = action.payload;
            if (res) {
                state._id = res._id;
                state.full_name = res.full_name;
                state.profile_picture = res.profile_picture;
                state.join_date = res.join_date;
                state.friends = res.friends;
                state.messages = res.messages;
                state.groups = res.groups;
                state.posts = res.posts;
                state.tags = res.tags;
                state.events = res.events;
                state.notifications = res.notifications;
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
