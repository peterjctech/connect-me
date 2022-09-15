import { BsFillPaletteFill } from "react-icons/bs";
import { BiColorFill } from "react-icons/bi";
import { useDispatch } from "react-redux";

import { testTheme, testColor } from "@store";
import { client } from "@utils";
import { LOGOUT_USER } from "@mutations";
import { Button } from "@common";

const Rightbar = () => {
    const dispatch = useDispatch();
    const logout = async () => {
        const response = await client.mutate({ mutation: LOGOUT_USER });
        console.log(response);
    };
    return (
        <div className="rightbar">
            <aside>
                <div onClick={() => dispatch(testTheme())}>
                    <BsFillPaletteFill />
                </div>
                <div onClick={() => dispatch(testColor())}>
                    <BiColorFill />
                </div>
                <Button click={logout}>Logout</Button>
            </aside>
        </div>
    );
};

export default Rightbar;
