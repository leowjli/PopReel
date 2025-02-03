import NextAuth from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";

const clientId = process.env.AUTH0_CLIENT_ID;
const clientSecret = process.env.AUTH0_CLIENT_SECRET;
const issuer = process.env.AUTH0_ISSUER;

if (!clientId || !clientSecret) {
  throw new Error('Auth0 environment variables are not defined.');
}

export const handler = NextAuth({
  providers: [
    Auth0Provider({
      clientId,
      clientSecret,
      issuer
    }),
  ],
});

export { handler as GET, handler as POST };