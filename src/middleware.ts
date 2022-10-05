import { NextRequest, NextResponse } from "next/server";

export default function (req: NextRequest) {
    const cookie = req.cookies.get(process.env.SERVER_KEY!);
    const PUBLIC_FILE = /\.(.*)$/;
    const isPublicFile = PUBLIC_FILE.test(req.nextUrl.pathname);
    const isHome = req.nextUrl.pathname === "/";

    if (isPublicFile || req.nextUrl.pathname.startsWith("/api")) {
        return NextResponse.next();
    } else if (!cookie && !isHome) {
        return NextResponse.redirect(new URL("/", req.url));
    } else if (cookie && isHome) {
        return NextResponse.redirect(new URL("/feed", req.url));
    } else {
        return NextResponse.next();
    }
}
