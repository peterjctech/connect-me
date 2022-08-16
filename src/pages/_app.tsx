import { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { client } from "@utils";
import { Provider } from "react-redux";
import store from "../store";
import { MainLayout } from "layout";
import "../styles/index.scss";

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
