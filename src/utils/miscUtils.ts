export const getTooltipList = (list: string[]) => {
    const initialLength = list.length;
    if (initialLength > 10) {
        list.splice(9);
        list.push(`and ${initialLength - 9} others...`);
    }

    return list;
};
