import { getStaticPageBySlug } from '@/actions/static-pages';
import NotFound from '@/app/not-found';
import { MaxWidth, PaddingContainer, SpaceContainer } from '@/components/common';
import { Metadata } from 'next';
import { cache } from 'react';

interface Props {
  params: {
    slug: string;
  };
}

const getSingleStaticPage = cache(async (slug: string) => {
  const staticPage = await getStaticPageBySlug(slug);
  return staticPage;
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const staticPage = await getSingleStaticPage(params.slug);
  if (!staticPage) {
    return {
      title: 'Page not found',
    };
  }
  return {
    title: staticPage.title,
    openGraph: {
      title: staticPage.title,
    },
  };
}

const StaticPages = async ({
  params,
}: {
  params: {
    slug: string;
  };
}) => {
  const staticPage = await getSingleStaticPage(params.slug);

  if (!staticPage) {
    return <NotFound />;
  }
  return (
    <MaxWidth>
      <SpaceContainer variant="small" />
      <PaddingContainer className="lg:px-4">
        <section className="static-page">
          <h1>{staticPage.title}</h1>
          <SpaceContainer variant="xsmall" />
          <div dangerouslySetInnerHTML={{ __html: staticPage.content }} />
        </section>
      </PaddingContainer>
      <SpaceContainer variant="small" />
    </MaxWidth>
  );
};

export default StaticPages;
