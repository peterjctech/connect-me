const getLoadingSVGNums = (props: { largestMiniRadius: number; viewBox: number }) => {
    const radius = props.viewBox / 2;
    const mini = props.largestMiniRadius;
    const short = (radius - mini) / 2;
    const long = short * Math.sqrt(3);

    const response = {
        num1: mini,
        num2: radius - long,
        num3: radius - short,
        num4: radius,
        num5: radius + short,
        num6: radius + long,
        num7: props.viewBox - mini,
    };

    return response;
};

export {};
