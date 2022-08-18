import Head from "next/head";
import { Form } from "@components";
import { useForm } from "@hooks";

const AuthPage = () => {
    const { formData, handleChange } = useForm({
        username: "",
        password: "",
    });

    const login = () => {
        console.log(formData);
    };

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
                <Form title="Login Here!" submit={login} submitText="Login">
                    <h1>AuthPage</h1>
                </Form>
            </div>
        </main>
    );
};

export default AuthPage;
