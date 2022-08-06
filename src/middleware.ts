import { NextRequest, NextResponse } from "next/server";

export default function (req: NextRequest) {
    const cookie = req.cookies.get("server-key");

    if (req.nextUrl.pathname.startsWith("/profile") && !cookie) {
        return NextResponse.redirect(new URL("/auth", req.url));
    }
}
