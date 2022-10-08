import userDefs from "./typeDefs/userDefs";
import postDefs from "./typeDefs/postDefs";
import miscDefs from "./typeDefs/miscDefs";
import groupDefs from "./typeDefs/groupDefs";
import tagDefs from "./typeDefs/tagDefs";
import eventDefs from "./typeDefs/eventDefs";

import userResolvers from "./resolvers/userResolvers";
import groupResolvers from "./resolvers/groupResolvers";
import postResolvers from "./resolvers/postResolvers";
import tagResolvers from "./resolvers/tagResolvers";

const typeDefs = [userDefs, postDefs, miscDefs, tagDefs, groupDefs, eventDefs];
const resolvers = [userResolvers, groupResolvers, tagResolvers, postResolvers];

export { typeDefs, resolvers };
