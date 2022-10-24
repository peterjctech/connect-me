import { LOGOUT_USER } from "@mutations";
import { client } from "utils";
import { useRouter } from "next/router";
import { Button } from "common";

const Rightbar = () => {
    const router = useRouter();
    const logout = async () => {
        await client.mutate({ mutation: LOGOUT_USER });
        router.reload();
    };
    return (
        <div className="rightbar">
            <aside>
                <Button click={logout} type="error">
                    Logout
                </Button>
            </aside>
        </div>
    );
};

export default Rightbar;
