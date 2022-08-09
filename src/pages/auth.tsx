import { client } from "@utils";
import { LOGIN_USER, LOGOUT_USER } from "@mutations";

export default function () {
    const logoutUser = async () => {
        const response = await client.mutate({ mutation: LOGOUT_USER });
        console.log(response.data.logoutUser);
    };
    const loginUser = async () => {
        const response = await client.mutate({
            mutation: LOGIN_USER,
            variables: { username: "hackerman123", password: "12345" },
        });
        console.log(response.data.loginUser);
    };

    return (
        <main>
            <button onClick={loginUser}>loginUser</button>
            <button onClick={logoutUser}>logoutUser</button>
        </main>
    );
}
