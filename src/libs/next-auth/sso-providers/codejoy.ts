import CredentialsProvider from 'next-auth/providers/credentials';

export interface MyLoginUserProfile {
  email: string;
  name: string;
  picture?: string;
  sub: string;
}

const provider = {
  id: 'codejoy',
  provider: CredentialsProvider({
    async authorize(credentials) {
      if (!credentials?.email || !credentials?.password) {
        throw new Error('请输入邮箱和密码');
      }

      const res = await fetch('http://localhost:7003/prodapi/admin/login', {
        body: JSON.stringify({
          bcompaniesCode: 'COOLAI',
          jobId: 'COOLAI00001',
          password: '1234567',
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });
      const response = await res.json();

      if (response.code !== 200) {
        throw new Error('用户不存在');
      }

      return {
        email: response.data.email,
        id: response.data.id,
        name: response.data.name,
      };
    },
    credentials: {
      email: { label: '邮箱', type: 'email' },
      password: { label: '密码', type: 'password' },
    },
  }),
};

export default provider;
