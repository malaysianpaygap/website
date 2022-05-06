import { GetServerSideProps } from 'next';

import { Layout } from '@/components/layout';
import { Seo } from '@/components/seo';

import { SubmitSalaryForm } from '@/modules/salary-submission';
import { IEmploymentOptions } from '@/shared/interface';

interface IProps {
  employmentOptions: IEmploymentOptions;
}

export default function SubmitSalaryPage(props: IProps) {
  return (
    <Layout>
      <Seo templateTitle='Submit Salary' />
      <main className='layout'>
        <SubmitSalaryForm {...props} />
      </main>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<IProps> = async () => {
  const res = await fetch(`http://localhost:3000/api/constant`);
  const { data } = await res.json();

  return {
    props: { employmentOptions: data },
  };
};
