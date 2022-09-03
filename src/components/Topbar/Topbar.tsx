import { BsFillPaletteFill } from "react-icons/bs";
import { BiColorFill } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { testColor, testTheme } from "@store";

const Topbar = () => {
    const dispatch = useDispatch();

    return (
        <div className="topbar">
            <div onClick={() => dispatch(testTheme())}>
                <BsFillPaletteFill />
            </div>
            <div onClick={() => dispatch(testColor())}>
                <BiColorFill />
            </div>
        </div>
    );
};

export default Topbar;
