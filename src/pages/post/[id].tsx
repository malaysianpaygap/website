import { GetStaticPaths, GetStaticProps } from 'next';

import { Layout } from '@/components/layout';
import { Seo } from '@/components/seo';

import { dummyData, PostDetails, TPostDetails } from '@/modules/post-details';

export default function PostDetailsPage(props: TPostDetails) {
  return (
    <Layout>
      <Seo templateTitle='Submit Salary' />
      <main className='layout'>
        <PostDetails {...props} />
      </main>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const dummyIds = [...Array(10).keys()];
  const paths = dummyIds.map((id) => {
    return {
      params: { id: (id + 1).toString() },
    };
  });

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params || {};
  return {
    props: { id, ...dummyData },
  };
};
