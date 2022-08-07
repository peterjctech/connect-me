import { ApolloServer } from "apollo-server-micro";
import Cors from "micro-cors";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { PageConfig } from "next";
import { connectDB } from "@database";
import { resolvers, typeDefs } from "../../graphql";
import { getCookie } from "cookies-next";
import jwt from "jsonwebtoken";

connectDB();

const cors = Cors();
const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    formatError: (err) => {
        if (err.message.startsWith("Database Error: ")) {
            return new Error("Internal server error");
        }
        return err;
    },
    context: async ({ res, req }) => {
        let id = null;
        const cookie: any = getCookie("server-key", { req, res });
        if (cookie) {
            const decoded: any = jwt.verify(cookie, process.env.TOKEN_SECRET!);
            if (decoded.id) id = decoded.id;
        }

        return { req, res, auth: id };
    },
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
