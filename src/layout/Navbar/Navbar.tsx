import { StoreInterface } from "@types";
import Link from "next/link";
import { BsFillPersonFill, BsFillChatDotsFill, BsBellFill } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import { useSelector } from "react-redux";
import { Input } from "@components";
import { useForm } from "@hooks";

const Navbar = () => {
    const { handleChange, formData } = useForm({
        search: "",
    });

    const userStore = useSelector((state: StoreInterface) => state.user);
    console.log(userStore.id);

    const logout = async () => {
        console.log("logout");
    };
    const options = [
        {
            label: "Hi",
            value: "hi",
        },
    ];
    return (
        <nav className="navbar">
            <section>
                <Link href="/">ConnectMe</Link>
                <Link href="/profile">Profile</Link>
            </section>
            <section>
                <Input value={formData.search} handleChange={handleChange} name="search" />
                <BiSearch />
            </section>
            <section>
                <BsFillPersonFill />
                <BsFillChatDotsFill />
                <BsBellFill />
                {userStore.id && <button onClick={logout}>Logout</button>}
            </section>
        </nav>
    );
};

export default Navbar;
