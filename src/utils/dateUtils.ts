import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
dayjs.extend(advancedFormat);

export const formatTimestamp = (timestamp: number, type: "fulldate" | "date") => {
    switch (type) {
        case "fulldate":
            return dayjs.unix(timestamp).format("dddd, Do MMMM, YYYY");
        case "date":
            return dayjs.unix(timestamp).format("Do MMMM, YYYY");
    }
};
