import { useEffect } from "react";

interface HotkeyArgs {
    code: string;
    callback: Function;
}

export default function ({ code, callback }: HotkeyArgs) {
    const event = (event: KeyboardEvent) => {
        if (event.code === code) callback();
    };

    useEffect(() => {
        addEventListener("keydown", event);

        return () => {
            removeEventListener("keydown", event);
        };
    });
}
