import userDefs from "./typeDefs/userDefs";

import userResolvers from "./resolvers/userResolvers";

const typeDefs = [userDefs];
const resolvers = [userResolvers];

export { typeDefs, resolvers };
