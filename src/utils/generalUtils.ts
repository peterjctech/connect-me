import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
dayjs.extend(advancedFormat);

export const formatDate = (date: Date) => {
    if (!date) return undefined;
    return dayjs(date).format("MMMM Do, YYYY");
};
