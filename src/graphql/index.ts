// import conversationDefs from "./typeDefs/conversationDefs";
// import eventDefs from "./typeDefs/eventDefs";
// import groupDefs from "./typeDefs/groupDefs";
// import postDefs from "./typeDefs/postDefs";
// import interestDefs from "./typeDefs/interestDefs";
import userDefs from "./typeDefs/userDefs";
import miscDefs from "./typeDefs/miscDefs";

import userResolvers from "./resolvers/userResolvers";
import postResolvers from "./resolvers/postResolvers";
import interestResolvers from "./resolvers/interestResolvers";
import groupResolvers from "./resolvers/groupResolvers";
import conversationResolvers from "./resolvers/conversationResolvers";
import eventResolvers from "./resolvers/eventResolvers";

const typeDefs = [userDefs, miscDefs];
const resolvers = [
    userResolvers,
    postResolvers,
    interestResolvers,
    groupResolvers,
    conversationResolvers,
    eventResolvers,
];

export { typeDefs, resolvers };
