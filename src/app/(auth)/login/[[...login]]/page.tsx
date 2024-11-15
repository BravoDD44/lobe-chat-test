// import { SignIn } from '@clerk/nextjs';

// import { BRANDING_NAME } from '@/const/branding';
// import { metadataModule } from '@/server/metadata';
// import { translation } from '@/server/translation';

// export const generateMetadata = async () => {
//   const { t } = await translation('clerk');
//   return metadataModule.generate({
//     description: t('signIn.start.subtitle'),
//     title: t('signIn.start.title', { applicationName: BRANDING_NAME }),
//     url: '/login',
//   });
// };

// const Page = () => {
//   return <SignIn path="/login" />;
// };

// Page.displayName = 'Login';

// export default Page;

// app/(auth)/login/page.tsx
'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    const formData = new FormData(event.currentTarget);
    const bcompaniesCode = formData.get('bcompaniesCode') as string;
    const password = formData.get('password') as string;
    const jobId = formData.get('jobId') as string;

    try {
      const result = await signIn('credentials', {
        bcompaniesCode,
        jobId,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
        return;
      }

      router.push('/dashboard'); // 登录成功后跳转
      router.refresh();
    } catch {
      setError('登录过程中出现错误');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div>
          <h2 className="text-center text-3xl font-bold">登录</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label className="sr-only" htmlFor="bcompaniesCode">
                租户代码
              </label>
              <input
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                id="bcompaniesCode"
                name="bcompaniesCode"
                placeholder="租户代码"
                required
                type="text"
              />
            </div>
            <div>
              <label className="sr-only" htmlFor="jobId">
                工号
              </label>
              <input
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                id="jobId"
                name="jobId"
                placeholder="工号"
                required
                type="text"
              />
            </div>
            <div>
              <label className="sr-only" htmlFor="password">
                密码
              </label>
              <input
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                id="password"
                name="password"
                placeholder="密码"
                required
                type="password"
              />
            </div>
          </div>

          <div>
            <button
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={isLoading}
              type="submit"
            >
              {isLoading ? '登录中...' : '登录'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
