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
                if (token) {
                    console.log("true")
                    return true
                }
                else {
                    return false
                }
            },
        },
    }
);

export const config = { matcher: ["/admin"] };