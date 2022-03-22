import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

import { Layout } from '@/components/layout';
import { Seo } from '@/components/seo';

import { SubmitSalaryForm } from '@/modules/salary-submission';

export default function SubmitSalaryPage() {
  return (
    <Layout>
      <Seo templateTitle='Submit Salary' />
      <main className='layout'>
        <GoogleReCaptchaProvider
          reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
        >
          <SubmitSalaryForm />
        </GoogleReCaptchaProvider>
      </main>
    </Layout>
  );
}
