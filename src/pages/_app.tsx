import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { ApolloProvider } from "@apollo/client";
import "../styles/index.scss";

import { MainLayout } from "@layouts";
import { client } from "@utils";
import store from "@store";

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
