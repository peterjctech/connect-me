import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { client } from "utils";
import { MainLayout } from "layouts";
import store from "store";
import { Provider } from "react-redux";
import "../styles/index.scss";

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <ApolloProvider client={client}>
            <Provider store={store}>
                <MainLayout>
                    <Component {...pageProps} />;
                </MainLayout>
            </Provider>
        </ApolloProvider>
    );
};

export default MyApp;
