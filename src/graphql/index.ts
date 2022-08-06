import chatDefs from "./typeDefs/chatDefs";
import commentDefs from "./typeDefs/commentDefs";
import eventDefs from "./typeDefs/eventDefs";
import groupDefs from "./typeDefs/groupDefs";
import postDefs from "./typeDefs/postDefs";
import tagDefs from "./typeDefs/tagDefs";
import userDefs from "./typeDefs/userDefs";

import userResolvers from "./resolvers/userResolvers";
import postResolvers from "./resolvers/postResolvers";
import tagResolvers from "./resolvers/tagResolvers";
import groupResolvers from "./resolvers/groupResolvers";
import chatResolvers from "./resolvers/chatResolvers";
import commentResolvers from "./resolvers/commentResolvers";
import eventResolvers from "./resolvers/eventResolvers";

const typeDefs = [chatDefs, commentDefs, eventDefs, groupDefs, postDefs, tagDefs, userDefs];
const resolvers = [
    userResolvers,
    postResolvers,
    tagResolvers,
    groupResolvers,
    chatResolvers,
    commentResolvers,
    eventResolvers,
];

export { typeDefs, resolvers };
