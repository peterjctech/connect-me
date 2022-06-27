import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@database";
import { UserModel } from "@models";
import { checkCreateUser } from "@services";

connectDB();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    let response;

    if (req.method === "POST") {
        const args = await checkCreateUser(req.body);
        if (args.error) {
            response = args.error;
        } else {
            const { username, password, first_name, last_name, profile_picture } = args;
            try {
                const user = await UserModel.create({
                    username,
                    password,
                    first_name,
                    last_name,
                    profile_picture,
                });
                response = { success: `Successfully registered ${user.username}!` };
            } catch (error) {
                console.log(error);
                response = { serverError: "An unexpected error has occurred" };
            }
        }
    }

    return res.end(JSON.stringify(response));
}
