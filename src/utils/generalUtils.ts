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
