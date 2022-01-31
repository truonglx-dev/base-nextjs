import { AppPropsWithLayout } from '../layouts/typeLayout';
import DashboardLayout from '@layout/dashboardLayout';
import Head from 'next/head';
import '../styles/globals.css';
import { Provider } from 'react-redux';
import store from 'store';
import { ThemeProvider } from 'next-themes';

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.layout ?? DashboardLayout;

  return (
    <Provider store={store}>
      <ThemeProvider attribute="class">
        <Head>
          <title>{Component.title}</title>
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
