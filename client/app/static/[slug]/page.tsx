import { getStaticPageBySlug } from '@/actions/static-pages';
import NotFound from '@/app/not-found';
import { MaxWidth, PaddingContainer, SpaceContainer } from '@/components/common';

const StaticPages = async ({
  params,
}: {
  params: {
    slug: string;
  };
}) => {
  const staticPage = await getStaticPageBySlug(params.slug);

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
