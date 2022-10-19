import { connectDB, seedDatabase } from "database";

const seed = async () => {
    await connectDB();
    await seedDatabase();
};

export default seed;
