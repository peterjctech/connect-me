import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@database";
import { User } from "@models";
import { checkCreateUser } from "@services";

connectDB();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        let response;
        const createUser = await checkCreateUser(req.body);
        if (createUser.error) {
            response = { error: createUser.error };
        } else {
            try {
                const user = await User.create(createUser);
                response = { success: `${user.username} registered!` };
            } catch (error) {
                response = { serverError: "An unexpected error has occurred" };
                console.log(error);
            }
        }
        return res.end(JSON.stringify(response));
    }
}
