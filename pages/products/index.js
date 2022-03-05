import { useRouter } from "next/router";
import { resourcesApi } from "../../redux/apiStore";

export default function index() {
  const router = useRouter();
  const { queryText, categoryId } = router.query;

  const { data, isLoading } = resourcesApi.useSearchProductQuery(
    queryText,
    categoryId
  );

  return (
    <div>
      index
      {queryText}
      {categoryId}
      {JSON.stringify(data)}
    </div>
  );
}
