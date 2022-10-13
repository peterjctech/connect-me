import { LOGOUT_USER } from "@mutations";
import { client } from "utils";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";

const Rightbar = () => {
    const router = useRouter();
    const logout = async () => {
        await client.mutate({ mutation: LOGOUT_USER });
        router.reload();
    };
    return (
        <div className="rightbar">
            <Link href="/info">
                <h1 className="link">README</h1>
            </Link>
            <p>
                This website is a work in progress. Complete functionality is not yet complete. Almost all data is
                artificially seeded. Login with the following credentials to fully experience this project so far:
            </p>
            <br />
            <p>Username: hackerman123</p>
            <p>Password: 12345</p>
            <aside>
                <button onClick={logout}>Logout</button>
            </aside>
        </div>
    );
};

export default Rightbar;
