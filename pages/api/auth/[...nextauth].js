import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
export const authOptions = {
    // Secret
    secret: process.env.NEXTAUTH_SECRET,

    session: {
        strategy: "jwt",
    },

    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            type: "credentials",
            // `credentials` is used to generate a form on the sign in page.
            credentials: {},

            async authorize(credentials, req) {
                const { username, password } = credentials
                const res = await fetch("http://localhost:3000/api/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username,
                        password,
                    }),
                });
                const user = await res.json();
                if (res.ok && user) {
                    return user;
                } else return null;
            },
        }),
        // ...add more providers here
    ],

    callbacks: {
        async jwt(params) {
            // return final_token
            return params.token;
        },
    },
    pages: {
        signIn: '/login',
        // error: "/auth/error",
        // signOut: "/auth/signout"
    }
}
export default NextAuth(authOptions)