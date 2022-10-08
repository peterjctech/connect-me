import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
dayjs.extend(advancedFormat);

export const formatDate = (date: Date) => {
    if (!date) return undefined;
    return dayjs(date).format("MMMM Do, YYYY");
};

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

const calculateRelative = (ts: number) => {
    const sec = dayjs().unix() - ts;
    const floor = (num: number, suffix: string) => `${Math.floor(sec / num)}${suffix}`;

    if (sec < 60) return "Just now";
    if (sec < 3600) return floor(60, "m");
    if (sec < 86400) return floor(3600, "h");
    if (sec < 86400 * 7) return floor(86400, "d");
    if (ts > dayjs().subtract(1, "year").unix()) return floor(86400 * 7, "w");
    return `${dayjs().year() - dayjs.unix(ts).year()}y`;
};

export const getCreatedAt = (date: Date) => {
    const obj = dayjs(date);
    const absolute = `${obj.format("dddd, MMMM Do, YYYY")} at ${obj.format("h:mm A")}`;
    const relative = calculateRelative(obj.unix());

    return { absolute, relative };
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

export const formatEventDatetime = (dates: [Date] | [Date, Date]) => {
    if (!dates[1]) {
        return dayjs(dates[0]).format("h:mm A on dddd, MMMM Do, YYYY");
    } else {
        const start = dayjs(dates[0]).format("h:mm A");
        const end = dayjs(dates[1]).format("h:mm A");
        return `${start} - ${end} on ${dayjs(dates[0]).format("dddd, MMMM Do, YYYY")}`;
    }
};
