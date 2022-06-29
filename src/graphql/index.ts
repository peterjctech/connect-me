import userDefs from "./typeDefs/userDefs";
import userResolvers from "./resolvers/userResolvers";

const resolvers = [userResolvers];
const typeDefs = [userDefs];

export { typeDefs, resolvers };
