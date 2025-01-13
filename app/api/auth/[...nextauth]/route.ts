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
  async session({ session }: any): Promise<void> {},
  async signIn({ profile }) {
    try {
      await connectToDB();

      return true;
    } catch (error: any) {
      throw new Error(`Error failed` + error.message);
    }
  },
});

export { handler as GET, handler as POST };
