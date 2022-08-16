import Link from "next/link";

const Navbar = () => {
    return (
        <nav className="navbar">
            <Link href="/">Home</Link>
            <br />
            <Link href="/profile">Profile</Link>
            <br />
            <Link href="/auth">Auth</Link>
        </nav>
    );
};

export default Navbar;
