import { AppProps } from 'next/app';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

import '@/styles/globals.css';

import { IsClientProvider } from '@/hooks/use-is-client';

/**
 *
 * ? `Layout` component is called in every page using `np` snippets. If you have consistent layout across all page, you can add it here too
 */

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <IsClientProvider>
      <GoogleReCaptchaProvider
        reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
      >
        <Component {...pageProps} />
      </GoogleReCaptchaProvider>
    </IsClientProvider>
  );
}

export default MyApp;
