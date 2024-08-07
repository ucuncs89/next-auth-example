import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: '378539455727-5u65dvlrcocbtarp0kiqvhn99pjq0pim.apps.googleusercontent.com',
      clientSecret: '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',
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ account, profile }) {
      if (account.provider === "google") {
        try {
          const response = await fetch('https://b7a6-202-138-238-49.ngrok-free.app/auth/google', {
            method: 'POST',
            headers: {
              'accept': '*/*',
              'Api-Version': 'v1',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ idToken: account.id_token }),
          });

          if (response.ok) {
            const session = await response.json();
            console.log(session);/// buat object session terus set ke cookies
            return session;
          } else {
            return false;
          }
        } catch (error) {
          console.error('Error verifying user:', error);
          return false;
        }
      }
      return false; // Reject sign-in for other providers
    },
  },
});

