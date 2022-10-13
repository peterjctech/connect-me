export const getTooltipList = (list: string[]) => {
    const count = list.length;
    if (count === 0) return undefined;
    if (count > 10) {
        list = list.slice(0, 9);
        list.push(`and ${count - 9} others...`);
    }
    return list;
};

export const getListAndCount = (list: string[]) => {
    const count = list.length;
    return { list: getTooltipList(list), count };
};

export const getList = (list: string[]) => {
    if (!list || list.length === 0) return null;
    if (list.length > 3) return `${list[0]}, ${list[1]}, and ${list.length - 2} others`;
    if (list.length === 3) return `${list[0]}, ${list[1]}, and ${list[2]}`;
    if (list.length === 2) return `${list[0]} and ${list[1]}`;
    if (list.length === 1) return `${list[0]}`;
};

export const getReactionDisplay = (list: string[]) => {
    let extended = "";

    switch (list.length) {
        case 0:
            break;
        case 1:
            extended = list[0];
            break;
        case 2:
            extended = `${list[0]} and ${list[1]}`;
            break;
        case 3:
            extended = `${list[0]}, ${list[1]}, and ${list[2]} `;
            break;
        default:
            extended = `${list[0]}, ${list[1]}, and ${list.length - 2} others`;
    }

    return { standard: list.length, extended };
};
