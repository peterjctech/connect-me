import { ApolloProvider } from "@apollo/client";
import { client } from "@utils";
import { Provider } from "react-redux";
import store from "../store";
import { MainLayout } from "layout";

const MyApp = ({ Component, pageProps }: any) => {
    return (
        <ApolloProvider client={client}>
            <Provider store={store}>
                <MainLayout>
                    {Component.PageLayout ? (
                        <Component.PageLayout>
                            <Component {...pageProps} />
                        </Component.PageLayout>
                    ) : (
                        <Component {...pageProps} />
                    )}
                </MainLayout>
            </Provider>
        </ApolloProvider>
    );
};

export default MyApp;
