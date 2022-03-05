import { useRouter } from "next/router";
import { resourcesApi } from "../../redux/apiStore";
import { FlexContainer } from "../../components/Containers";
import { ProductCard } from "../../components/Card";

export default function index() {
  const router = useRouter();
  const { queryText, categoryId } = router.query;

  const { data, isLoading } = resourcesApi.useSearchProductQuery(
    queryText,
    categoryId
  );

  return (
    <div>
      <FlexContainer>
        {data?.data.map((product) => (
          <ProductCard
            coverImage={product.images[0].imageName}
            title={product.title}
            slug={product.slug}
            category={product.categoryTitle}
            price={product.unitPrice[0].sellingPrice}
          />
        ))}
        {/* <ProductCard 
        coverImage={}
        title={}
        slug={}
        category={}
        price={}
        /> */}
      </FlexContainer>
    </div>
  );
}
