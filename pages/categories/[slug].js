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
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="10 days" />
      </Head>

      <CategoryCover title={data.meta.category.title} />

      <Section.Container>
        <Section.Divider>
          <CategoriesList />
          <ProductDisplay products={data.data}/>
        </Section.Divider>
      </Section.Container>
    </>
  );
}


//serverside data fetching
export async function getServerSideProps(context) {
  const { slug } = context.query;
  const res = await rssApi.get(`product?categoryId=${slug}`);

  if (!res)
    return {
      notFound: true,
    };
  return {
    props: { data: res.data },
  };
}
