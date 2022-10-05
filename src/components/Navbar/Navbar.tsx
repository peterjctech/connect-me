import { useRouter } from "next/router";
import { AiFillHome, AiFillSetting } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";

const Navbar = () => {
    const router = useRouter();

    const search = () => {
        console.log("search");
    };

    const routes = [
        { route: "/feed", text: "Home", component: AiFillHome, class: "tablet" },
        { route: "/dashboard", text: "My Profile", component: BsFillPersonFill, class: "tablet" },
        { route: "/settings", text: "Settings", component: AiFillSetting, class: "tablet" },
    ];

    return (
        <nav className="navbar">
            {routes.map((route) => {
                return (
                    <div
                        onClick={route.route ? () => router.push(route.route) : () => search()}
                        key={route.route}
                        className={`hover-change ${route.class}`}
                    >
                        <route.component />
                        <h4>{route.text}</h4>
                    </div>
                );
            })}
        </nav>
    );
};

export default Navbar;
