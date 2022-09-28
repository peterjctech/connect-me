import dayjs from "dayjs";

export const dates = {
    creation: dayjs().year(2016).month(3).date(1).toDate(),
    last_month: dayjs().subtract(1, "month").toDate(),
    last_week: dayjs().subtract(1, "week").toDate(),
    yesterday: dayjs().subtract(1, "day").toDate(),
    now: dayjs().toDate(),
    next_week: dayjs().add(1, "week").toDate(),
    future: dayjs().add(3, "month").toDate(),
};

export const randomDate = (d1: Date, d2: Date) => {
    if (d1 > d2) throw new Error("randomDate dates must be ordered from earliest to latest");
    const timestamp = randomNumber(dayjs(d1).unix(), dayjs(d2).unix());
    return dayjs.unix(timestamp).toDate();
};

export const randomNumber = (num1: number, num2: number) => Math.floor(Math.random() * (num2 - num1 + 1) + num1);

export const probability = (num: number) => (Math.random() < num ? true : false);

export const getLastDate = (dates: Date[]) => {
    dates.sort((a: Date, b: Date) => dayjs(b).unix() - dayjs(a).unix());
    return dates[0];
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
