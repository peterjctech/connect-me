import { Schema } from "mongoose";
import { INotification } from "@types";

const NotificationSchema = new Schema<INotification>({
    message: { type: String, required: true },
    redirect: { type: String, required: true },
    notified_at: { type: Date, default: new Date() },
    is_read: { type: Boolean, default: false },
});

export default NotificationSchema;
