import type { NextAuthConfig } from 'next-auth';
// import urlJoin from 'url-join';

import { authEnv } from '@/config/auth';

import { ssoProviders } from './sso-providers';

export const initSSOProviders = () => {
  return authEnv.NEXT_PUBLIC_ENABLE_NEXT_AUTH
    ? authEnv.NEXT_AUTH_SSO_PROVIDERS.split(/[,，]/).map((provider) => {
        const validProvider = ssoProviders.find(
          (item) => item.id === provider.trim(),
        );

        if (validProvider) return validProvider.provider;

        throw new Error(`[NextAuth] provider ${provider} is not supported`);
      })
    : [];
};

// Notice this is only an object, not a full Auth.js instance
export default {
  callbacks: {
    authorized() {
      return true; // 根据需要修改授权逻辑
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  providers: initSSOProviders(),
  // redirectProxyUrl: process.env.APP_URL
  //   ? urlJoin(process.env.APP_URL, '/api/auth')
  //   : undefined,
  secret: authEnv.NEXT_AUTH_SECRET,
  trustHost: process.env?.AUTH_TRUST_HOST
    ? process.env.AUTH_TRUST_HOST === 'true'
    : true,
} satisfies NextAuthConfig;
