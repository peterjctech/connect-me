import { client } from "@utils";
import { MainLayout } from "@components";
import { GET_GROUP } from "@queries";
import { DELETE_GROUP } from "@mutations";
import { useSelector } from "react-redux";

export default function () {
    const userStore = useSelector((state: any) => state.user);
    const deleteGroup = async () => {
        const response = await client.mutate({
            mutation: DELETE_GROUP,
            variables: {
                id: "62f2d943418cbdb4f2c37f58",
            },
        });
        console.log(response);
    };

    const getGroup = async () => {
        const response = await client.query({
            query: GET_GROUP,
            variables: {
                id: "62efb979f2b0aa3d6e1835f8",
            },
        });
        console.log(response);
    };
    return (
        <MainLayout title="Home">
            <main>
                <hr />
                <button onClick={deleteGroup}>deleteGroup</button>
                <button onClick={getGroup}>getGroup</button>
            </main>
        </MainLayout>
    );
}
