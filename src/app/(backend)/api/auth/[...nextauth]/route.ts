import NextAuthNode from '@/libs/next-auth';

export const { GET, POST } = NextAuthNode.handlers;
// //

// app/api/auth/[...nextauth]/route.ts
// import NextAuth from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import type { NextAuthConfig } from 'next-auth';

// export const config = {
//   callbacks: {
//     authorized() {
//       return true; // 根据需要修改授权逻辑
//     },
//     jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//       }
//       return token;
//     },
//     session({ session, token }) {
//       if (session.user) {
//         session.user.id = token.id as string;
//       }
//       return session;
//     },
//   },
//   pages: {
//     signIn: '/login',
//   },
//   providers: [
//     CredentialsProvider({
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           throw new Error('请输入邮箱和密码');
//         }

//         const res = await fetch('http://localhost:7003/prodapi/admin/login', {
//           body: JSON.stringify({
//             bcompaniesCode: 'COOLAI',
//             jobId: 'COOLAI00001',
//             password: '123456',
//           }),
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           method: 'POST',
//         });
//         const response = await res.json();

//         if (response.code !== 200) {
//           throw new Error('用户不存在');
//         }

//         return {
//           email: response.data.email,
//           id: response.data.id,
//           name: response.data.name,
//         };
//       },
//       credentials: {
//         email: { label: '邮箱', type: 'email' },
//         password: { label: '密码', type: 'password' },
//       },
//     }),
//   ],
// } satisfies NextAuthConfig;

// const { handlers } = NextAuth(config);

// export const { GET, POST } = handlers;
