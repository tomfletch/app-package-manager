import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { Roboto } from 'next/font/google';
import '../styles/reset.css';
import '../styles/globals.css';
import PageLayout from '../components/PageLayout/PageLayout';
import { ThemeProvider, createTheme } from '@mui/material';

const roboto = Roboto({
  weight: ['400', '500'],
  subsets: ['latin']
});

const theme = createTheme({
  palette: {
    primary: { main: 'hsl(217, 97%, 59%)' },
    secondary: { main: '#ffffff' }
  }
});

function MyApp({ Component, pageProps: { session, ...pageProps} }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={theme}>
        <div className={roboto.className}>
          <PageLayout>
            <Component {...pageProps} />
          </PageLayout>
        </div>
      </ThemeProvider>
    </SessionProvider>
  );
}

export default MyApp;
