import { useForm } from "@hooks";
import Link from "next/link";
import { AiFillSetting, AiFillBell } from "react-icons/ai";
import { BsFillChatDotsFill, BsFillPersonFill } from "react-icons/bs";
import { Input, Button } from "@components";
import { useDispatch } from "react-redux";
import { setTheme } from "@store";

const Navbar = () => {
    const { formData, handleChange } = useForm({
        search: "",
    });

    const dispatch = useDispatch();

    const switchTheme = () => dispatch(setTheme());

    return (
        <div className="navbar">
            <section className="navbar__links">
                <Link href="/">
                    <h1 className="navbar__logo">ConnectMe</h1>
                </Link>
                <Link href="/profile">
                    <h1 className="navbar__link">Profile</h1>
                </Link>
                <Button click={switchTheme}>Switch Theme</Button>
            </section>
            <section className="navbar__search">
                <Input name="search" value={formData.search} handleChange={handleChange} />
            </section>
            <section>
                <BsFillPersonFill />
                <BsFillChatDotsFill />
                <AiFillBell />
                <AiFillSetting />
            </section>
        </div>
    );
};

export default Navbar;
