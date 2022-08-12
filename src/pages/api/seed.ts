import { seedDatabase, connectDB } from "@database";

export default async function () {
    await connectDB();
    seedDatabase();
}
