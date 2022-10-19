import { NextApiRequest, NextApiResponse } from "next";
import { connectDB, seedDatabase } from "database";

const seed = async (req: NextApiRequest, res: NextApiResponse) => {
    await connectDB();
    await seedDatabase();
};

export default seed;
