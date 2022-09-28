import { Types } from "mongoose";

type ID = Types.ObjectId;

export interface INotification {
    _id: ID;
    message: string;
    redirect: string;
    notified_at: Date;
    is_read: boolean;
}
