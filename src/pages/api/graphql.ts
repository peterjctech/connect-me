import { ApolloServer } from "apollo-server-micro";
import Cors from "micro-cors";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { PageConfig } from "next";
import { connectDB } from "../../database";
import { resolvers, typeDefs } from "../../graphql";

connectDB();

const cors = Cors();
const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

const startServer = apolloServer.start();

export default cors(async function handler(req: any, res: any) {
    if (req.method === "OPTIONS") {
        res.end();
        return false;
    }
    await startServer;

    await apolloServer.createHandler({
        path: "/api/graphql",
    })(req, res);
});

export const config: PageConfig = {
    api: {
        bodyParser: false,
    },
};
