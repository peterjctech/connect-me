import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB, seedDatabase } from "@database";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    await connectDB();
    const response = await seedDatabase();
    res.json(response);
}
