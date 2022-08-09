import { client } from "@utils";
import { GET_ALL_USERS, GET_ME, GET_USER } from "@queries";
import { MainLayout } from "@components";
import { DELETE_USER } from "@mutations";
import { useSelector, useDispatch } from "react-redux";
import { StateInterface } from "@types";
import { setUserStore } from "../store";

export default function () {
    const userStore = useSelector((state: StateInterface) => state.user);
    const deleteUser = async () => {
        const response = await client.mutate({
            mutation: DELETE_USER,
            variables: {
                id: "62f2cf2b0f7a6fd22099ddb7",
            },
        });
        console.log(response);
    };

    const getAllUsers = async () => {
        const response = await client.query({
            query: GET_ALL_USERS,
        });
        console.log(response);

        // fetch("/api/seed");
    };
    return (
        <MainLayout title="Home">
            <main>
                <hr />
                <button onClick={deleteUser}>deleteUser</button>
                <button onClick={getAllUsers}>getAllUsers</button>
            </main>
        </MainLayout>
    );
}
