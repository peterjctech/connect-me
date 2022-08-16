import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(advancedFormat);
dayjs.extend(relativeTime);

export const formatTimestamp = (timestamp: number, format: "datetime" | "fulldate" | "dynamicdate" | "relative") => {
    switch (format) {
        case "dynamicdate":
            const beginningOfTimestamp = dayjs.unix(timestamp).startOf("day").unix();

            if (beginningOfTimestamp === dayjs().startOf("day").unix()) {
                const timeElapsed = dayjs().unix() - timestamp;
                let approx;
                if (timeElapsed < 120) {
                    approx = "Just now";
                } else if (timeElapsed < 3600) {
                    approx = `${Math.floor(timeElapsed / 60)}m`;
                } else {
                    approx = `${Math.floor(timeElapsed / 3600)}h`;
                }
                return approx;
            } else if (beginningOfTimestamp === dayjs().subtract(1, "day").startOf("day").unix()) {
                return dayjs.unix(timestamp).format("Yesterday at hh:mm A");
            } else {
                return dayjs.unix(timestamp).format("hh:mm A on Do MMMM, YYYY");
            }
        case "relative":
            return dayjs.unix(timestamp).toNow();
        case "fulldate":
            return dayjs.unix(timestamp).format("dddd, Do MMMM, YYYY");
        case "datetime":
            return dayjs.unix(timestamp).format("hh:mm A on M/D/YY");
    }
};
