import { Layout } from '@/components/layout';
import { Seo } from '@/components/seo';

import { SubmitSalaryForm } from '@/modules/salary-submission';

export default function SubmitSalaryPage() {
  return (
    <Layout>
      <Seo templateTitle='Submit Salary' />
      <main className='layout'>
        <SubmitSalaryForm />
      </main>
    </Layout>
  );
}
