import dayjs from "dayjs";

export const dates = {
    oldest_user: dayjs().year(1990).toDate(),
    youngest_user: dayjs().year(2008).toDate(),
    creation: dayjs().year(2016).month(3).date(1).toDate(),
    last_year: dayjs().subtract(1, "year").toDate(),
    two_months_ago: dayjs().subtract(2, "month").toDate(),
    last_month: dayjs().subtract(1, "month").toDate(),
    ten_days_ago: dayjs().subtract(10, "day").toDate(),
    now: dayjs().toDate(),
    next_week: dayjs().add(1, "week").toDate(),
    future: dayjs().add(3, "month").toDate(),
};

// Inclusive
export const randomNumber = (num1: number, num2: number) => Math.floor(Math.random() * (num2 - num1 + 1) + num1);

export const randomDate = (d1: Date, d2: Date) => {
    const timestamp = randomNumber(dayjs(d1).unix(), dayjs(d2).unix());
    return dayjs.unix(timestamp).toDate();
};

export const getLastDate = (dates: Date[]) => {
    const d = dates.sort((a, b) => dayjs(b).unix() - dayjs(a).unix());
    return d[0];
};

export const probability = (num?: number) => {
    const prob = num || Math.random();
    return Math.random() < prob ? true : false;
};

export const randomRelativeDate = (date: Date, days: number) => {
    const secondDate = dayjs(date).add(days, "day").toDate();
    if (days > 0) {
        return randomDate(date, secondDate);
    } else {
        return randomDate(secondDate, date);
    }
};

export const randomIndices = ({ range, length }: { range: [number, number]; length: number }) => {
    const num = randomNumber(range[0], range[1]);
    const arr: number[] = [];

    while (arr.length < num) {
        const random = randomNumber(0, length - 1);
        if (arr.indexOf(random) === -1) arr.push(random);
    }

    return arr;
};
