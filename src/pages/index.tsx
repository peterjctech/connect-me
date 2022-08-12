import { client } from "@utils";
import { MainLayout } from "@components";
// import { GET_GROUP } from "@queries";
// import { DELETE_GROUP } from "@mutations";
import { useSelector } from "react-redux";

export default function () {
    const userStore = useSelector((state: any) => state.user);
    const executeQuery = async () => {
        await fetch("/api/seed");
        // const response = await client.query({
        //     query: GET_GROUP,
        //     variables: {},
        // });
        // console.log(response);
    };

    const executeMutation = async () => {
        // const response = await client.mutate({
        //     mutation: CREATE_GROUP,
        //     variables: {},
        // });
        // console.log(response);
    };

    return (
        <MainLayout title="Home">
            <main>
                <hr />
                <button onClick={executeQuery}>Execute Query</button>
                <button onClick={executeMutation}>Execute Mutation</button>
            </main>
        </MainLayout>
    );
}
