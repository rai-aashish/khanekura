import styles from "../styles/components/product-display.module.scss";
import { ProductCard } from "./Card";
import { FlexContainer } from "./Containers";
import { useEffect, useState } from "react";

export default function ProductDisplay({ products }) {
  const [sortedProducts, setSortedProducts] = useState(products);
  const [sortMethod, setSortMethod] = useState("");

  const sortBy = (method, products) => {
    let temp = [];
    let items = [...products];

    const sortPromise = new Promise((resolve, reject) => {
      switch (method) {
        case "ZtoA":
          temp = items.sort(function (a, b) {
            if (a.title < b.title) return 1;
            else if (a.title > b.title) return -1;
            else return 0;
          });
          break;

        case "HtoL":
          temp = items.sort(function (a, b) {
            if (a.unitPrice[0].sellingPrice < b.unitPrice[0].sellingPrice)
              return 1;
            else if (a.unitPrice[0].sellingPrice > b.unitPrice[0].sellingPrice)
              return -1;
            else return 0;
          });
          break;

        case "LtoH":
          temp = items.sort(function (a, b) {
            if (a.unitPrice[0].sellingPrice > b.unitPrice[0].sellingPrice)
              return 1;
            else if (a.unitPrice[0].sellingPrice < b.unitPrice[0].sellingPrice)
              return -1;
            else return 0;
          });
          break;

        //"AtoZ":
        default:
          temp = items.sort(function (a, b) {
            if (a.title > b.title) return 1;
            else if (a.title < b.title) return -1;
            else return 0;
          });
          break;
      }
      resolve(temp);
    });
    return sortPromise;
  };

  useEffect(() => {
    setSortedProducts(null);
    const sortData = async () => {
      const data = await sortBy(sortMethod, products);
      //console.log(data);
      setSortedProducts(data);
    };
    sortData();
  }, [sortMethod, products]);

  return (
    <div className={styles["product-display"]}>
      <div className={styles["product-display__filter"]}>
        <div>There are {products.length} products</div>
        <div>
          <select onChange={(e) => setSortMethod(e.target.value)}>
            <option value="" disabled>
              {" "}
              Select{" "}
            </option>
            <option value="AtoZ"> A to Z</option>
            <option value="ZtoA"> Z to A</option>
            <option value="HtoL"> Price HIGH to LOW</option>
            <option value="LtoH"> Price Low to HIGH</option>
          </select>
        </div>
      </div>
      <FlexContainer>
        {sortedProducts
          ? sortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                title={product.title}
                slug={product.slug}
                price={product.unitPrice[0].sellingPrice}
                category={product.categoryTitle}
                coverImage={product.images[0].imageName}
              />
            ))
          : "loading..."}
        {products.length === 0 && (
          <div className={styles["no-items"]}>
            Sorry currently there are no items here.
          </div>
        )}
      </FlexContainer>
    </div>
  );
}

ProductDisplay.defaultProps = {
  totalProduct: "0",
  product: null,
  isLoading: true,
};
