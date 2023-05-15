import { AppProps } from 'next/app';
import { Roboto } from 'next/font/google';
import '../styles/reset.css';
import '../styles/globals.css';

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin']
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={roboto.className}>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
