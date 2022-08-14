import { Types } from "mongoose";

export const getFullName = (user: any) => {
    if (!user.first_name || !user.last_name) {
        throw new Error("User does not have a valid first and/or last name");
    } else {
        return `${user.first_name} ${user.last_name}`;
    }
};

export const getMutualCount = (arr1: Types.ObjectId[] | null, arr2: Types.ObjectId[] | null) => {
    if (!arr2 || !arr1) return 0;
    return arr1.filter((id) => arr2.includes(id)).length;
};
