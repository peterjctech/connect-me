import Link from "next/link";

const Sidebar = () => {
    return (
        <nav className="sidebar">
            <Link href="/">Home</Link>
            <br />
            <Link href="/profile">Profile</Link>
            <br />
            <Link href="/auth">Auth</Link>
        </nav>
    );
};

export default Sidebar;
