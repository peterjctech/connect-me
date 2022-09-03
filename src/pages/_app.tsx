import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { ApolloProvider } from "@apollo/client";
import { MainLayout } from "@layouts";
import { client } from "@utils";
import store from "@store";
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
