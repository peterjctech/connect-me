import Link from "next/link";

export default function () {
    return (
        <nav>
            <Link href="/">Home</Link>
            <Link href="/profile">Profile</Link>
        </nav>
    );
}
