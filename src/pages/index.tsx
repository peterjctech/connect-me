import { client } from "@utils";
import { GET_ME } from "@queries";
import { LOGIN_USER, LOGOUT_USER, CREATE_USER } from "@mutations";
import { useQuery, useMutation } from "@apollo/client";

export default function (props: any) {
    const getMe = async () => {
        const response = await client.query({ query: GET_ME });
        console.log(response.data.getMe);
    };
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
            <button onClick={getMe}>getMe</button>
            <button onClick={logoutUser}>logoutUser</button>
            <button onClick={loginUser}>loginUser</button>
            <button onClick={getMe}>getMe</button>
        </main>
    );
}
