import { rssApi, userApi } from "../../helpers/axios";
import Image from "next/image";
import styles from "../../styles/pages/product.module.scss";
import { Container, Section } from "../../components/Containers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMinus,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useContext } from "react";
import { toast } from "react-toastify";
import { CartContext } from "../../context/CartContextProvider";
import { useRouter } from "next/router";
import { SmallSpinner } from "../../components/Spinners";
import { AuthContext } from "../../context/AuthContextProvider";
import Head from "next/head";

export default function Products({ data }) {
  const router = useRouter();

  const user = useContext(AuthContext);
  const [productQuantity, setProductQuantity] = useState(1);
  const [productNote, setProductNote] = useState("");
  const [blockSubmit, setBlockSubmit] = useState(false);
  const [cartData, setCartData] = useContext(CartContext);

  //handle product quantity
  const handleProductQuantity = (quantity) => {
    if (quantity < 1) quantity = 1;
    setProductQuantity(quantity);
  };

  // post data via api
  const addToCart = async () => {
    if (!user.access_token) {
      toast.info("User not logged in! LOGIN NOW.");
      localStorage.setItem("last-path", router.asPath);
      router.push("/login");
      return 0;
    }

    setBlockSubmit(true);

    let productData = {
      productId: data.data.id,
      priceId: data.data.unitPrice[0].id,
      quantity: productQuantity,
      note: productNote,
    };
    try {
      toast
        .promise(
          userApi.post("cart-product", productData, {
            headers: {
              Authorization: user.access_token,
            },
          }),
          {
            pending: "Adding to cart...",
            success: "Product added successfully",
            error: "Ops! Something went wrong",
          }
        )
        .then(() =>
          userApi.get("cart", {
            headers: {
              Authorization: user.access_token,
            },
          })
        )
        .then((res) => {
          setCartData(res.data.data);
          setBlockSubmit(false);
        });
    } catch (err) {
      setBlockSubmit(false);
    }
  };
  return (
    <Container>
      <Head>
        <title>{data.data.categoryTitle} | {data.data.title}</title>
      </Head>
      <Section.Container>
        <div className={styles["product-view"]}>
          <div className={styles["cover-image"]}>
            <Image
              src={data.data.images[0].imageName}
              layout="fill"
              objectFit="cover"
              alt={data.data.title}
            />
          </div>

          <div className={styles["product-contents"]}>
            <h1>{data.data.title}</h1>
            <p className={styles["category"]}>
              category: {data.data.categoryTitle}
            </p>
            <p className={styles["price"]}>
              Nrs.{data.data.unitPrice[0].sellingPrice}{" "}
              <small> &#40;including TAX &#41;</small>
            </p>
            <p className={styles["description"]}>
              Description:
              <span
                dangerouslySetInnerHTML={{
                  __html: data.data.description,
                }}
              />
            </p>
            <p className={styles["note"]}>
              <span>Note:</span>
              <br />
              <input
                type="text"
                value={productNote}
                onChange={(e) => setProductNote(e.target.value)}
                placeholder="if any"
              />
            </p>
            <div className={styles["cart-options"]}>
              <div className={styles["cart-options__buttons"]}>
                <span
                  className={styles["icon"]}
                  onClick={() => handleProductQuantity(productQuantity - 1)}
                >
                  <FontAwesomeIcon icon={faMinus} size="lg" />
                </span>
                <span className={styles["product-quantity"]}>
                  {productQuantity}
                </span>
                <span
                  className={styles["icon"]}
                  onClick={() => handleProductQuantity(productQuantity + 1)}
                >
                  <FontAwesomeIcon icon={faPlus} size="lg" />
                </span>
              </div>
              <button
                className={styles["submit"]}
                onClick={() => {
                  if (!blockSubmit) addToCart();
                }}
              >
                Add to Cart
                <FontAwesomeIcon
                  icon={faShoppingCart}
                  size="lg"
                  className={styles["icon"]}
                />
                {blockSubmit && <SmallSpinner size="lg" />}
              </button>
            </div>
          </div>
        </div>
      </Section.Container>
    </Container>
  );
}

//serverside
export async function getServerSideProps(context) {
  const { slug } = context.query;
  const res = await rssApi.get(`product/${slug}`);

  if (!res)
    return {
      notFound: true,
    };

  return {
    props: {
      data: res.data,
    },
  };
}
