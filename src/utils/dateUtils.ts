import { CreatedAt } from "@types";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
dayjs.extend(advancedFormat);

export const formatTimestamp = (timestamp: number, format: "date" | "shortdate" | "absolute" | "relative") => {
    switch (format) {
        case "absolute":
            const dateObj = dayjs.unix(timestamp);
            return `${dateObj.format("MMMM Do, YYYY")} at ${dateObj.format("hh:mm A")}`;
        case "relative":
            const sec = dayjs().unix() - timestamp;
            const floor = (num: number, suffix: string) => `${Math.floor(sec / num)}${suffix}`;

            if (sec < 60) return "Just now";
            if (sec < 3600) return floor(60, "m");
            if (sec < 86400) return floor(3600, "h");
            if (sec < 86400 * 7) return floor(86400, "d");
            if (timestamp > dayjs().subtract(1, "year").unix()) return floor(86400 * 7, "w");
            return `${dayjs().year() - dayjs.unix(timestamp).year()}y`;
        case "date":
            return dayjs.unix(timestamp).format("MMMM Do, YYYY");
        case "shortdate":
            return dayjs.unix(timestamp).format("MM/DD/YYYY");
    }
};

export const getCreatedAt = (timestamp: number) => {
    const response: CreatedAt = {
        absolute: formatTimestamp(timestamp, "absolute"),
        relative: formatTimestamp(timestamp, "relative"),
    };
    return response;
};
