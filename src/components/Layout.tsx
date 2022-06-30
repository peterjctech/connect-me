import Head from "next/head";
import { Navbar } from "@components";

interface LayoutProps {
    title: string;
    children: React.ReactNode;
}

export default function ({ title, children }: LayoutProps) {
    return (
        <>
            <Head>
                <title>{title} | Connect Me</title>
            </Head>
            <Navbar />
            {children}
        </>
    );
}

// export default Home;
