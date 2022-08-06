import { client } from "@utils";
import { TEST } from "@queries";

export default function () {
    const hello = async () => {
        const response = await client.query({ query: TEST });
        console.log(response.data.test.message);
    };

    return <button onClick={hello}>Hello</button>;
}
