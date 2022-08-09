import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
dayjs.extend(advancedFormat);

export const formatTimestamp = (timestamp: number, type: "fulldate" | "date" | "time" | "datetime") => {
    switch (type) {
        case "fulldate":
            return dayjs.unix(timestamp).format("dddd, Do MMMM, YYYY");
        case "date":
            return dayjs.unix(timestamp).format("Do MMMM, YYYY");
        case "time":
            return dayjs.unix(timestamp).format("hh:mm A");
        case "datetime":
            return dayjs.unix(timestamp).format("hh:mm A on DD-MMM-YY");
    }
};
