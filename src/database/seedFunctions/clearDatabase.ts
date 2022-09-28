import { UserSchema, PostSchema, EventSchema, TagSchema, GroupSchema, ChatSchema } from "@models";

export default async function () {
    console.time("clearDatabase");
    await UserSchema.deleteMany();
    await PostSchema.deleteMany();
    await ChatSchema.deleteMany();
    await TagSchema.deleteMany();
    await GroupSchema.deleteMany();
    await EventSchema.deleteMany();
    console.timeEnd("clearDatabase");
}
