import { Schema } from "mongoose";
import { NotificationSubmodel } from "types";

const NotificationSubschema = new Schema<NotificationSubmodel>({
    title: { type: String, required: true },
    content: { type: String, required: true },
    redirect: { type: String, required: true },
    notified_at: { type: Date, default: () => new Date() },
    is_read: { type: Boolean, default: false },
});

export default NotificationSubschema;
