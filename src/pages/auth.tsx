import { useState } from "react";
import { Layout } from "@components";
import { LoginForm, RegisterForm } from "@domain";

export default function () {
    const [isLoginForm, setIsLoginForm] = useState(true);

    return (
        <Layout title="Login/Register">
            <main>
                <div className="container">
                    {isLoginForm === true ? (
                        <LoginForm changeForm={() => setIsLoginForm(false)} />
                    ) : (
                        <RegisterForm changeForm={() => setIsLoginForm(true)} />
                    )}
                </div>
            </main>
        </Layout>
    );
}
