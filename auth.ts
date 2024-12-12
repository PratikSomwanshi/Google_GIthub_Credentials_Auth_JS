import NextAuth, { AuthError, CredentialsSignin } from "next-auth";
import { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { HOST, TOKENS } from "./env.tokens";

import { v7 as uuidv7 } from "uuid";

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
                const { email, password } = credentials;

                try {
                    const res = await fetch(`${HOST.BACKEND_URL}/login`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ email, password }),
                    });

                    const data = (await res.json()).data[0];

                    console.log("data ", data);
                    if (!res.ok) {
                        throw new CredentialsSignin("Invalid credentials");
                    }

                    const user = {
                        username: data.username,
                        email: data.email,
                        token: data.token,
                        isLoggedIn: true,
                    };

                    return user;
                } catch (error) {
                    if (error instanceof CredentialsSignin) {
                        throw error;
                    }
                    throw new AuthError("An error occurred");
                }
            },
        }),
        Google,
    ],
    callbacks: {
        async signIn({ user, account }) {
            try {
                if (account?.provider === "google") {
                    const res = await fetch(
                        `${HOST.BACKEND_URL}/google/login`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                accessToken: account.id_token,
                            }),
                        }
                    );

                    if (!res.ok) {
                        return "/error?error=OAuthCallback";
                    }

                    const data = (await res.json()).data[0];

                    user.username = data.username;
                    user.email = data.email;
                    user.token = data.token;
                    user.isLoggedIn = true;
                    return true;
                }

                if (account?.provider === "credentials") {
                    return true;
                }

                return "/error?error=OAuthCallback";
            } catch (error: any) {
                return `/error?error=${error.message}`;
            }
        },
        async session({ session, user, token }) {
            // console.log("session user ", user);

            if (token) {
                session.user.username = token.username;
                session.user.email = token.email as string;
                session.user.token = token.token;
                session.user.isLoggedIn = token.isLoggedIn; // Set to true if the user is logged in
            }
            return session;
        },

        async jwt({ token, user, account }) {
            // console.log("jwt user ", user);
            // console.log("jwt account ", account);

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

// console.log("token ", account);

//                     const res = await fetch(`${HOST.BACKEND_URL}/user`, {
//                         method: "POST",
//                         headers: {
//                             "Content-Type": "application/json",
//                         },
//                         body: JSON.stringify({
//                             email: user.email,
//                         }),
//                     });

//                     const data = await res.json();

//                     // console.log("before ", data);

//                     if (res.ok) {
//                         console.log("user already exist");

//                         const onlyData = data.data[0];

//                         console.log("data ", onlyData);

//
//                     }

//                     if (data.error.code == "EMAIL_NOT_EXIST") {
//                         console.log("user not exist");
//                         const res = await fetch(
//                             `${HOST.BACKEND_URL}/register`,
//                             {
//                                 method: "POST",
//                                 headers: {
//                                     "Content-Type": "application/json",
//                                 },
//                                 body: JSON.stringify({
//                                     email: user.email,
//                                     username: user.name,
//                                     password: uuidv7(),
//                                 }),
//                             }
//                         );

//                         const data = (await res.json()).data;

//                         user.username = data.username;
//                         user.email = data.email;
//                         user.token = data.token;
//                         user.isLoggedIn = true;

//                         return true;
//                     }

//                     return false;
//                 }
