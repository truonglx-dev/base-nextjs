import PageLoading from '@components/common/PageLoading';
import { getMe } from 'features/auth/userSlice';
import { useAppDispatch, useAppSelector } from 'hooks';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useEffect } from 'react';
import { RootState } from 'store';
import { Footer } from './componentsLayoutDashboard/footer';
import { Navbar } from './componentsLayoutDashboard/navbar';
import { Sidebar } from './componentsLayoutDashboard/sidebar';
import { LayoutProps } from './typeLayout';

export default function DashboardLayout({ children }: LayoutProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((state: RootState) => state.auth.accessToken);
  const loading = useAppSelector((state: RootState) => state.auth.loading);

  useEffect(() => {
    if (!accessToken) {
      router.push('/login');
    } else {
      dispatch(getMe());
    }
  }, [accessToken]);

  if (loading) return <PageLoading />;
  return (
    <div className="">
      <Navbar />
      <div className="flex overflow-hidden bg-white pt-16">
        <Sidebar />
        <div
          id="main-content"
          className="flex w-full bg-gray-50 relative overflow-y-auto lg:ml-64  flex-col justify-between h-screen"
        >
          <main className="text-black">{children}</main>
          <Footer />
        </div>
      </div>
    </div>
  );
}
