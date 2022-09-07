import { BsFillPaletteFill } from "react-icons/bs";
import { BiColorFill } from "react-icons/bi";
import { useDispatch } from "react-redux";

import { testTheme, testColor } from "@store";

const Rightbar = () => {
    const dispatch = useDispatch();
    return (
        <div className="rightbar">
            <aside>
                <div onClick={() => dispatch(testTheme())}>
                    <BsFillPaletteFill />
                </div>
                <div onClick={() => dispatch(testColor())}>
                    <BiColorFill />
                </div>
            </aside>
        </div>
    );
};

export default Rightbar;
