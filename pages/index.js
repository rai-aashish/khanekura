import { CategoryCard } from "../components/Card";
import { Container, FlexContainer, Section } from "../components/Containers";
import { rssApi } from "../helpers/axios"; // requires a loader
import BannerSlider from "../components/BannerSlider";
import Head from "next/head";

export default function Home({ data }) {
  return (
    <>
    <Head>
      <title>Khanekura | Kitchen in cloud</title>
    </Head>
      <BannerSlider banners={data[0].details} />
      <Container>
        <Categories categories={data[1].categories} />
      </Container>
    </>
  );
}

function Categories({ categories }) {
  return (
    <Section.Container>
      <Section.Title title="Shop By Categories">
        We&#39;ve got something for everyone
      </Section.Title>

      <FlexContainer>
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            title={category.title}
            productNo={category.productCount}
            slug={category.slug}
            coverImage={category.icon}
          />
        ))}
      </FlexContainer>
    </Section.Container>
  );
}

//
export async function getServerSideProps(context) {
  try {
    const data = await rssApi.get("newhome");
    return {
      props: { data: data.data.data }, // will be passed to the page component as props
    };
  } catch (err) {
    return {
      notFound: true,
    };
  }
}
