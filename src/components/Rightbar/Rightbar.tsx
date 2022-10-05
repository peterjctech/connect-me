import { LOGOUT_USER } from "@mutations";
import { client } from "utils";
import { useDispatch } from "react-redux";
import { testTheme, testColor } from "store";
import { BsFillPaletteFill } from "react-icons/bs";
import { BiColorFill } from "react-icons/bi";

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
                <button onClick={logout}>Logout</button>
            </aside>
        </div>
    );
};

export default Rightbar;
