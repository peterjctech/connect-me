import { client } from "@utils";
import { GET_ME } from "@queries";
import { MainLayout } from "@components";
import { LOGIN_USER } from "@mutations";
import { useSelector, useDispatch } from "react-redux";
import { StateInterface } from "@types";
import { setUserStore } from "../store";

export default function () {
    const userStore = useSelector((state: StateInterface) => state.user);
    const getMe = async () => {
        console.log(userStore.full_name);
    };

    const loginUser = async () => {
        const response = await client.mutate({
            mutation: LOGIN_USER,
            variables: { username: "hackerman123", password: "12345" },
        });
        console.log(response);

        // fetch("/api/seed");
    };
    return (
        <MainLayout title="Home">
            <main>
                <hr />
                <button onClick={getMe}>getMe</button>
                <button onClick={loginUser}>login</button>
            </main>
        </MainLayout>
    );
}
