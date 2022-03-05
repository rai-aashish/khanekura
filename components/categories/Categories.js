import styles from "../../styles/components/categories/categories-slug.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import { resourcesApi } from "../../redux/apiStore";

export function CategoryCover({ title }) {
  return (
    <div className={styles["categories-cover"]}>
      <div className={styles["categories-cover__body"]}>
        <Link href="/">
          <a>Home</a>
        </Link>{" "}
        &gt; {title}
      </div>
    </div>
  );
}

export function CategoriesList() {
  const { data: categories, isLoading } = resourcesApi.useGetCategoriesQuery();
  const router = useRouter();
  const { slug } = router.query;

  return (
    <div className={styles["category-list"]}>
      <h3>Categories</h3>
      <ul>
        {categories &&
          categories?.data.map((category) => (
            <li
              key={category.id}
              className={`${category.slug === slug ? styles["active"] : ""}`}
            >
              <Link href={`/categories/${category.slug}`}>
                <a>{category.title}</a>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
