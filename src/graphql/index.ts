import userDefs from "./typeDefs/userDefs";
import miscDefs from "./typeDefs/miscDefs";
import postDefs from "./typeDefs/postDefs";

import userResolvers from "./resolvers/userResolvers";

const typeDefs = [userDefs, miscDefs, postDefs];
const resolvers = [userResolvers];

export { typeDefs, resolvers };
