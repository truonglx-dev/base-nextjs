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
  }, [accessToken, dispatch, router]);

  if (loading) return <PageLoading />;
  return (
    <div className="">
      <Navbar />
      <div className="flex overflow-hidden bg-white pt-16">
        <Sidebar />
        <div className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10" id="sidebarBackdrop"></div>

        <div id="main-content" className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64">
          <main>{children}</main>
          <Footer />
        </div>
      </div>
    </div>
  );
}
