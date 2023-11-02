import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { connectToDataBase } from "@lib/db";
import TyeeGuidesUser from "@models/user";

const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
  callbacks: {
    async signIn(user: any) {
      await connectToDataBase();
      try {
        const findUser = await TyeeGuidesUser.findOne({
          email: user.user.email,
        });
        if (findUser) {
          console.log(user.user.email);
          return true;
        } else if (findUser === null) {
          console.log("Creating new user", user.user.email);
          const newUser = new TyeeGuidesUser({
            email: user.user.email,
            username: user.user.name,
          });
          await newUser.save();
          return true;
        }
      } catch (error) {
        console.error(error);
        return false;
      }
    },
  },
};

export const handler = NextAuth(authOptions); 

export { handler as GET, handler as POST };
