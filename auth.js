import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import logger from 'js/logger/logger.js';
import connectToDatabase from "./js/mongoose/connection";
import Admin from 'js/schemas/admin.js';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          scope: [
            "openid",
            "profile",
            "email",
            "https://www.googleapis.com/auth/calendar",
            "https://www.googleapis.com/auth/calendar.events.public.readonly",
            "https://www.googleapis.com/auth/calendar.settings.readonly",
            "https://www.googleapis.com/auth/iam.test",
            "https://www.googleapis.com/auth/calendar.acls.readonly",
            "https://www.googleapis.com/auth/calendar.readonly",
            "https://www.googleapis.com/auth/calendar.calendars.readonly",
            "https://www.googleapis.com/auth/calendar.events.readonly",
            "https://www.googleapis.com/auth/service.management",
            "https://www.googleapis.com/auth/service.management.readonly",
            
            // Add more scopes as needed based on your Google Cloud Console
          ].join(" "),  // Join the scopes with a spac
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account}) {
      logger.debug(`Inside the OAuth callback. The value of ${user}, and the value of ${account}`)
      if (account) {
        await connectToDatabase();
        const user = await Admin.getAdmin();
        const accessToken = await user.updateGoogleAccessToken(account.access_token);
      }


      return true;
    }
  },
  // callbacks: {
  //   async jwt({ token, account }) {
  //     // Store the access token in the token object if it's available
  //     if (account) {
  //       token.accessToken = account.access_token;
  //     }
  //     return token;
  //   },
  //   async session({ session, token }) {
  //     // Pass the access token to the session if it's available in the token
  //     session.accessToken = token.accessToken;
  //     return session;
  //   },
  // },
  debug: true,
});

export default handlers;