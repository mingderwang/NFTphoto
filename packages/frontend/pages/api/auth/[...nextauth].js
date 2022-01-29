import NextAuth from "next-auth";

export default NextAuth({
  providers: [
    {
      id: "pinterest",
      name: "Pinterest",
      type: "oauth",
      version: "2.0",
      token: "https://api.pinterest.com/v5/oauth/token",
      authorization: {
        url: "https://www.pinterest.com/oauth",
        params: {
          audience: "api.pinterest.com",
          prompt: "consent",
          scope:
            "ads:read,boards:read,boards:read_secret,boards:write,boards:write_secret,pins:read,pins:read_secret,pins:write,pins:write_secret,user_accounts:read",
        },
      },
      token: "https://api.pinterest.com/v5/oauth/token",
      userinfo: {
        url: "https://api.pinterest.com/v5/user_account",
        async request({ client, tokens }) {
          // Get base profile
          const profile = await client.userinfo(tokens);
          // no email info from Pinterest API
          if (!profile.email) {
            profile.email = profile.username;
          }
          return profile;
        },
      },
      clientId: process.env.PINTEREST_CLIENT_ID,
      clientSecret: process.env.PINTEREST_CLIENT_SECRET,

      profile(profile, accessToken) {
        return {
          id: profile.username,
          name: profile.username,
          email: profile.email,
          image: profile.profile_image,
        };
      },
      checks: "state",
      headers: {},
      authorizationParams: {
        client_id: process.env.PINTEREST_CLIENT_ID,
        redirect_uri: encodeURIComponent(process.env.PINTEREST_REDIRECT_URI),
      },
    },
  ],
  secret: process.env.SECRET,

  session: {
    strategy: "jwt",
  },

  jwt: {
  },

  pages: {
  },

  callbacks: {
  },

  events: {},

  theme: {
    colorScheme: "light",
  },

  debug: false,
});

