import chatDefs from "./typeDefs/chatDefs";
import eventDefs from "./typeDefs/eventDefs";
import groupDefs from "./typeDefs/groupDefs";
import miscDefs from "./typeDefs/miscDefs";
import postDefs from "./typeDefs/postDefs";
import tagDefs from "./typeDefs/tagDefs";
import userDefs from "./typeDefs/userDefs";

import chatResolvers from "./resolvers/chatResolvers";
import eventResolvers from "./resolvers/eventResolvers";
import groupResolvers from "./resolvers/groupResolvers";
import postResolvers from "./resolvers/postResolvers";
import tagResolvers from "./resolvers/tagResolvers";
import userResolvers from "./resolvers/userResolvers";

const typeDefs = [userDefs, postDefs, miscDefs, tagDefs, groupDefs, eventDefs, chatDefs];
const resolvers = [userResolvers, groupResolvers, tagResolvers, postResolvers, chatResolvers, eventResolvers];

export { typeDefs, resolvers };
