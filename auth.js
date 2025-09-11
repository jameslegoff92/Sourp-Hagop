import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectToDatabase from "./js/mongoose/connection";
import Admin from './js/schemas/admin.js';

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
                      ].join(" "),
          access_type: "offline",
          prompt: "consent"
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account}) {
      if (account) {
        await connectToDatabase();
        const user = await Admin.getAdmin();
        const accessToken = await user.updateGoogleAccessToken(account.access_token);
        const refreshToken = await user.updateGoogleRefreshToken(account.refresh_token);
        const expires_in = await user.updateGoogleTokenExpiry(account.expires_in);
      }


      return true;
    }
  },
  debug: true,
});

export default handlers;