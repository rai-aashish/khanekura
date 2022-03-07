import { useRouter } from "next/router";
import { resourcesApi } from "../../redux/apiStore";
import { Container, Section } from "../../components/Containers";
import { SmallSpinner } from "../../components/Spinners";
import ProductDisplay from "../../components/ProductDisplay";

export default function index() {
  const router = useRouter();
  const { queryText, categoryId } = router.query;

  const { data, isLoading, isSuccess } = resourcesApi.useSearchProductQuery(
    queryText,
    categoryId
  );

  return (
    <Container>
      <Section.Container>
        <Section.Title
          title={`Displaying ${data?.data?.length} products for query "${queryText}" `}
        ></Section.Title>

        {/* spinner while loading */}
        {isLoading && (
          <center>
            <SmallSpinner size="5x" />
          </center>
        )}
        {/* //display search results */}
        {isSuccess && <ProductDisplay products={data?.data} />}
      </Section.Container>
    </Container>
  );
}
