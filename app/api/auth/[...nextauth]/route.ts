import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import NextAuth from "next-auth";

import GithubProvider from "next-auth/providers/github";

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session }: any): Promise<void> {
      const sessionUser = await User.findOne({
        email: session.user.email,
      });

      session.user.id = sessionUser._id.toString();

      return session;
    },
    async signIn({ profile }: any) {
      try {
        await connectToDB();
        // check if a user already exists
        const userExists = await User.findOne({
          email: profile.email,
        });

        //if not, crete a new user

        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }

        return true;
      } catch (error: any) {
        throw new Error(`Error failed` + error.message);
      }
    },
  },
});

export { handler as GET, handler as POST };
