import userDefs from "./typeDefs/userDefs";
import miscDefs from "./typeDefs/miscDefs";

import userResolvers from "./resolvers/userResolvers";

const typeDefs = [userDefs, miscDefs];
const resolvers = [userResolvers];

export { typeDefs, resolvers };
