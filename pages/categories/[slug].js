import { ProductCard } from "../../components/Card";
import { rssApi } from "../../helpers/axios";
import { FlexContainer, Container, Section } from "../../components/Containers";
import Head from "next/head";
import {
  CategoriesList,
  CategoryCover,
} from "../../components/categories/Categories";
import ProductDisplay from "../../components/ProductDisplay";

export default function Product({ data }) {
  console.log(data);
  return (
    <>
      <Head>
        <meta name="title" content="title" />
        <title>KhaneKura | {data.meta.category.title}</title>
        <meta
          name="description"
          content="khane kura is famous for delivering "
        />
        <meta name="keywords" content="khanekura,momo,pizza" />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="10 days" />
      </Head>

      <CategoryCover title={data.meta.category.title} />

      <Section.Container>
        <Section.Divider>
          <CategoriesList />
          <ProductDisplay products={data.data} />
        </Section.Divider>
      </Section.Container>
    </>
  );
}

//ISR implementation
export async function getStaticProps({ params }) {
  const res = await rssApi.get(`product?categoryId=${params.slug}`);

  if (!res)
    return {
      notFound: true,
    };

  return {
    props: {
      data: res.data,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 60, // In seconds
  };
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
export async function getStaticPaths() {
  const res = await rssApi.get(`category`);

  // Get the paths we want to pre-render based on posts
  const paths = res.data.data.map((category) => ({
    params: { slug: category.slug },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: "blocking" };
}
