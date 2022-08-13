import dayjs from "dayjs";

export const formatTimestamp = (timestamp: number, format: "datetime") => {
    switch (format) {
        case "datetime":
            return dayjs.unix(timestamp).format("hh:mm A on M/D/YY");
    }
};
