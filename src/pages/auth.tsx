import Head from "next/head";
import { LoginForm } from "@domain";

const AuthPage = () => {
    return (
        <main className="auth-page">
            <Head>
                <title>Login/Register | ConnectMe</title>
            </Head>
            <img src="auth-background.jpg" alt="" />
            <section className="auth-page__welcome">
                <h1>Welcome to ConnectMe!</h1>
            </section>
            <div className="container">
                <LoginForm />
            </div>
        </main>
    );
};

export default AuthPage;
