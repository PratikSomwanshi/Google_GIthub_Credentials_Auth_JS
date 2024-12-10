import NextAuth, { AuthError } from "next-auth";
import { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { TOKENS } from "./env.tokens";

declare module "next-auth" {
    interface Session {
        user: {
            username: string;
            email: string;
            token: string;
            isLoggedIn: boolean;
        };
    }

    interface User {
        username: string;
        token: string;
        isLoggedIn: boolean;
    }
}

declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
    interface JWT {
        username: string;
        email: string;
        token: string;
        isLoggedIn: boolean;
    }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    const { email, password } = credentials;

                    // if (!email || !password) {
                    //     throw new Error(
                    //         "Please provide valid email and password"
                    //     );
                    // }

                    // Simulate an API call to authenticate the user
                    const user = {
                        username: "jetha",
                        email: "user@example.com",
                        token: "fake-jwt-token",
                        isLoggedIn: true,
                    };

                    // You can replace this with actual authentication logic
                    if (!user) {
                        throw new Error("Invalid credentials");
                    }

                    return user; // Successfully authenticated
                } catch (error: any) {
                    // console.error('Authentication error:', error.message);
                    throw new AuthError(error.messages);
                }
            },
        }),
        Google,
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            try {
                if (account?.provider === "google") {
                    // user.name;
                    // user.email;
                    // throw new Error("OAuthAccountNotLinked");
                    console.log("signin called in google", user);

                    return true;
                }

                if (account?.provider === "credentials") {
                    console.log("signin called in credentials", user);
                }

                return "/error?error=OAuthCallback";
            } catch (error: any) {
                return `/error?error=${error.message}`;
            }
        },
        async session({ session, user, token }) {
            if (token) {
                session.user.username = token.username;
                session.user.email = token.email as string;
                session.user.token = token.token;
                session.user.isLoggedIn = token.isLoggedIn; // Set to true if the user is logged in
            }
            return session;
        },

        async jwt({ token, user, account }) {
            if (user) {
                token.username = user.username;
                token.email = user.email as string;
                token.token = user.token;
                token.isLoggedIn = true;
            }
            return token;
        },
    },
    session: {
        strategy: "jwt",
    },
    secret: TOKENS.AUTH_SECRET,
    pages: {
        signIn: "/login",
        signOut: "/login",
        error: "/error",
    },
});
