
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Prisma from "next-auth/providers/email";

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [GitHub, Google, Prisma],
});