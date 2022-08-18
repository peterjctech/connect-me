import { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { client } from "@utils";
import { Provider } from "react-redux";
import store from "../store";
import "../styles/index.scss";
import { MainLayout } from "@layouts";

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <ApolloProvider client={client}>
            <Provider store={store}>
                <MainLayout>
                    <Component {...pageProps} />
                </MainLayout>
            </Provider>
        </ApolloProvider>
    );
};

export default MyApp;
