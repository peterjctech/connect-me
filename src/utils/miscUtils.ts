export const getTooltipList = (list: string[]) => {
    const initialLength = list.length;
    if (initialLength > 10) {
        const newList = list.slice(0, 9);
        newList.push(`and ${initialLength - 9} others...`);
        return newList;
    } else {
        return list;
    }
};

export const getUserListDisplay = (arr: string[]) => {
    const response = {
        tooltip: getTooltipList(arr),
        count: arr.length,
        display: "",
    };

    switch (response.count) {
        case 0:
            return response;
        case 1:
            response.display = arr[0];
            return response;
        case 2:
            response.display = `${arr[0]} and ${arr[1]}`;
            return response;
        case 3:
            response.display = `${arr[0]}, ${arr[1]}, and ${arr[2]}`;
            return response;
        default:
            if (arr.length > 11) {
                response.display = response.count.toString();
            } else {
                response.display = `${arr[0]}, ${arr[1]}, and ${arr.length - 2} others`;
            }
            return response;
    }
};
