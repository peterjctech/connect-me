import { getTooltipList } from "@utils";

type Any = any;

interface GetFullNameProps extends Any {
    first_name: string;
    last_name: string;
}

export const getFullName = (user: GetFullNameProps) => {
    if (!user.first_name || !user.last_name) {
        throw new Error("User does not have a valid first and/or last name");
    } else {
        return `${user.first_name} ${user.last_name}`;
    }
};

export const getMutualCount = (arr1: string[], arr2: string[]) => {
    return arr1.filter((id) => arr2.includes(id)).length;
};

interface GetMutualFriendsProps {
    id: string;
    first_name: string;
    last_name: string;
}

export const getMutualFriends = (arr1: GetMutualFriendsProps[], arr2: string[]) => {
    const list = arr1.filter((obj) => arr2.includes(obj.id));
    const names = list.map((obj) => getFullName(obj));
    return { list: getTooltipList(names), count: list.length };
};
