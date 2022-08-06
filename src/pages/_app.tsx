import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { client } from "@utils";
import { Provider } from "react-redux";
import store from "../store";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ApolloProvider client={client}>
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        </ApolloProvider>
    );
}

export default MyApp;
