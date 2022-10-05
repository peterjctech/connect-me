import { Types } from "mongoose";
import { FriendshipModel } from "types";

export const getFriends = ({ userId, friendships }: { userId: Types.ObjectId; friendships: FriendshipModel[] }) => {
    const friends = friendships
        .filter((obj) => {
            if (obj.is_accepted) {
                if (obj.reciever === userId || obj.sender === userId) return true;
            }
            return false;
        })
        .map((obj) => {
            if (obj.sender === userId) return obj.reciever;
            return obj.sender;
        });
    return friends;
};
