import Link from "next/link";
import Image from "next/image";
import categoriesImage from "../assets/images/placeholders/categories.png";
import styles from "../styles/components/card.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle, faSearch } from "@fortawesome/free-solid-svg-icons";

export function CategoryCard({ title, productNo, slug, coverImage }) {
  return (
    <div className={styles["category-card"]}>
      <div className={styles["category-card__typography"]}>
        <h4>{title}</h4>
        <span>{productNo ?? 0} Products</span>
        <Link href={`/categories/${slug}`}>
          <a>
            Explore
            <FontAwesomeIcon icon={faPlayCircle} className={styles["icon"]} />
          </a>
        </Link>
      </div>
      <Image
        src={coverImage ?? categoriesImage}
        layout="fill"
        objectFit="cover"
        priority={false}
        quality={25}
      />
    </div>
  );
}

//productCard
export function ProductCard({ coverImage, title, slug, category, price }) {
  return (
    <div className={styles["product-card"]}>
      <div className={styles["product-card__image"]}>
        <Image
          src={coverImage}
          layout="fill"
          objectFit="cover"
          priority="false"
          quality={25}
        />
        {/* explore icon*/}
        <Link href={`/products/${slug}`}>
          <div className={styles["explore-icon"]}>
            <FontAwesomeIcon icon={faSearch} size="2x" />
          </div>
        </Link>
      </div>

      <div className={styles["product-card__desc"]}>
        <span className={styles["category"]}>{category}</span>
        <Link href={`/products/${slug}`}>
          <a className={styles["title"]}>{title}</a>
        </Link>
        <span className={styles["price"]}>Nrs. {price}</span>
        <Link href={`/products/${slug}`}>
          <a className={styles["shop"]}>Add to Cart</a>
        </Link>
      </div>
    </div>
  );
}
