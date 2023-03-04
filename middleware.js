import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { useRouter } from "next/router";


export default withAuth(
    function middleware(req) {
        // return NextResponse
        return NextResponse.rewrite(new URL("/admin", req.url));
    },
    {
        callbacks: {
            authorized({ token }) {
                return token?.role === "admin";
            },
        },
    }
);

export const config = { matcher: ["/admin"] };