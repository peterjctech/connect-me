import { StoreInterface } from "@types";
import { useSelector } from "react-redux";

export default function () {
    const userStore = useSelector((state: StoreInterface) => state.user);
    return userStore.theme === "Dark" ? "dark" : "light";
}
