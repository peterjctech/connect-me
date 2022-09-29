import { Types } from "mongoose";

type ID = Types.ObjectId;

export interface UserModel {
    _id: ID;
    username: string;
    password: string;
}
