import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { login, getCurrentUser } from "api/api";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    session: {
      strategy: 'jwt'
    },
    providers: [
        CredentialsProvider({
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials) {
                try {
                    const token = await login(credentials.email, credentials.password);
                    if (token) {
                        const user = await getCurrentUser(token);
                        return user;
                    } else {
                        throw new Error("Account not found");
                    }
                } catch (error) {
                    console.log("Error occurred during login:", error);
                }
            },
        })
    ],
    callbacks: {
        async session({ session, token }) {
            session.user = token.user;
            return session;
          },
        async jwt({ token, user }) {
            if (user) {
              token.user = user;
            }
            return token;
          },
    }
});