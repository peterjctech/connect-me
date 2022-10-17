import { LOGOUT_USER } from "@mutations";
import { client } from "utils";
import { readme } from "helpers";
import { useRouter } from "next/router";
import Link from "next/link";
import { Button } from "common";

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
            <p>{readme}</p>
            <br />
            <p>Username: hackerman123</p>
            <p>Password: 12345</p>
            <aside>
                <Button click={logout} type="error">
                    Logout
                </Button>
            </aside>
            <Link href="/info">
                <a className="link">Click here to see the current list of upcoming changes</a>
            </Link>
        </div>
    );
};

export default Rightbar;
