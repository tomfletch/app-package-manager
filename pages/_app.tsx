import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { Roboto } from 'next/font/google';
import '../styles/reset.css';
import '../styles/globals.css';
import PageLayout from '../components/PageLayout/PageLayout';

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin']
});

function MyApp({ Component, pageProps: { session, ...pageProps} }: AppProps) {
  return (
    <SessionProvider session={session}>
      <div className={roboto.className}>
        <PageLayout>
          <Component {...pageProps} />
        </PageLayout>
      </div>
    </SessionProvider>
  );
}

export default MyApp;
