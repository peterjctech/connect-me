import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";

export const formatTimestamp = (timestamp: number, format: "datetime" | "fulldate") => {
    switch (format) {
        case "fulldate":
            return dayjs.unix(timestamp).format("dddd, Do MMMM, YYYY");
        case "datetime":
            return dayjs.unix(timestamp).format("hh:mm A on M/D/YY");
    }
};
