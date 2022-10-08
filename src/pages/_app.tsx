import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { client } from "utils";
import { MainLayout } from "layouts";
import store from "store";
import { Provider } from "react-redux";
import "../styles/index.scss";

const NestedLayout = ({ Component, pageProps }: any) => {
    if (Component.PageLayout) {
        return (
            <Component.PageLayout>
                <Component {...pageProps} />
            </Component.PageLayout>
        );
    } else {
        return <Component pageProps={pageProps} />;
    }
};

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <ApolloProvider client={client}>
            <Provider store={store}>
                <MainLayout>
                    <NestedLayout Component={Component} pageProps={pageProps} />
                </MainLayout>
            </Provider>
        </ApolloProvider>
    );
};

export default MyApp;
