import userDefs from "./typeDefs/userDefs";
import miscDefs from "./typeDefs/miscDefs";
import postDefs from "./typeDefs/postDefs";
import groupDefs from "./typeDefs/groupDefs";
import convoDefs from "./typeDefs/convoDefs";
import tagDefs from "./typeDefs/tagDefs";
import eventDefs from "./typeDefs/eventDefs";

import userResolvers from "./resolvers/userResolvers";
import postResolvers from "./resolvers/postResolvers";

const typeDefs = [userDefs, miscDefs, postDefs, groupDefs, convoDefs, tagDefs, eventDefs];
const resolvers = [userResolvers, postResolvers];

export { typeDefs, resolvers };
