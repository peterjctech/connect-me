import { UserSummary } from "types";

const addFriend = (props: { userId: string }) => {
    // TODO: addFriend
    console.log("addFriend");
};
const removeFriend = (props: { userId: string }) => {
    // TODO: removeFriend
    console.log("removeFriend");
};
const cancelFriendRequest = (props: { userId: string }) => {
    // TODO: cancelFriendRequest
    console.log("cancelFriendRequest");
};
const acceptFriendRequest = (props: { userId: string }) => {
    // TODO: acceptFriendRequest
    console.log("acceptFriendRequest");
};

interface UserActionReturn {
    button: "success" | "warning" | "info" | "error" | "help";
    text: string;
    action: (props: { userId: string }) => void;
}

export const userFriendAction = (user: UserSummary): UserActionReturn | null => {
    if (user.friendship_status === "Accepted") {
        return { action: removeFriend, button: "error", text: "Remove Friend" };
    } else if (user.friendship_status === "Sent") {
        return { action: cancelFriendRequest, button: "warning", text: "Cancel Request" };
    } else if (user.friendship_status === "Recieved") {
        return { action: acceptFriendRequest, button: "success", text: "Accept Request" };
    } else if (user.mutual_friend_count !== null) {
        return { action: addFriend, button: "info", text: "Add Friend" };
    } else {
        return null;
    }
};
