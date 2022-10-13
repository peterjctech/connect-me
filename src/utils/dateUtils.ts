import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
dayjs.extend(advancedFormat);

export const formatDate = (date: Date) => {
    if (!date) return undefined;
    return dayjs(date).format("MMMM Do, YYYY");
};

export const formatRelativeDate = (date: Date) => {
    return calculateRelative(dayjs(date).unix());
};

export const calculateEventDatetime = (dates: [Date, Date | null]) => {
    if (!dates[1]) return dayjs(dates[0]).format("HH:mm A on MM/DD/YYYY");
    return `${dayjs(dates[0]).format("HH:mm A")} - ${dayjs(dates[1]).format("HH:mm A")} on ${dayjs(dates[0]).format(
        "MM/DD/YYYY"
    )}`;
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

export const formatDatetime = (date: Date) => {
    if (!date) return undefined;
    return dayjs(date).format("HH:mm A on MM/DD/YYYY");
};
