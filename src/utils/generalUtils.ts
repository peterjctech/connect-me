export const getFullName = (user: any) => {
    if (!user.first_name || !user.last_name) {
        throw new Error("User does not have a valid first and/or last name");
    } else {
        return `${user.first_name} ${user.last_name}`;
    }
};
