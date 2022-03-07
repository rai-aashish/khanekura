import { rssApi } from "../../helpers/axios";
import Image from "next/image";
import styles from "../../styles/pages/product.module.scss";
import { Container, Section } from "../../components/Containers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMinus,
  faShoppingCart,
  faTrash,
  faCheck,
  faMarker,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { SmallSpinner } from "../../components/Spinners";
import Head from "next/head";
import { userApi } from "../../redux/apiStore";
import { UserContext } from "../../context/UserContextProvider";

export default function Products({ data }) {
  const router = useRouter();

  const [user] = useContext(UserContext);
  const [productQuantity, setProductQuantity] = useState(1);
  const [productNote, setProductNote] = useState("");
  const [productAddedIndex, setProductAddedIndex] = useState(-1);

  const { data: cartData } = userApi.useGetCartQuery();
  const [updateCartProduct, { isLoading: isCartUpdating }] =
    userApi.useUpdateCartProductMutation();
  const [addCartProduct, { isLoading }] = userApi.useAddCartProductMutation();
  const [deleteCartProduct, { isLoading: isProductDeleting }] =
    userApi.useDeleteCartProductMutation();

  //handle product quantity
  const handleProductQuantity = (quantity) => {
    if (quantity < 1) quantity = 1;
    setProductQuantity(quantity);
  };

  useEffect(() => {
    let index = cartData?.data?.cartProducts?.findIndex(
      (product) => product.selectedUnit.id === String(data.data.id)
    );

    //if product is added in cart set product index and set note of added products
    if (index !== -1) {
      setProductAddedIndex(index);
      setProductNote(
        cartData?.data?.cartProducts[productAddedIndex]?.note ?? ""
      );
    } else setProductAddedIndex(-1);
  }, [cartData, data]);

  // post data via api
  const addToCart = async () => {
    if (!user.isLogged) {
      toast.info("User not logged in! LOGIN NOW.");
      localStorage.setItem("last-path", router.asPath);
      router.push("/login");
      return 0;
    }

    if (!isLoading) {
      let productData = {
        productId: data.data.id,
        priceId: data.data.unitPrice[0].id,
        quantity: productQuantity,
        note: productNote,
      };

      addCartProduct(productData);
    }
  };

  //update cart products if already in cart
  const updateCart = () => {
    let productData = {
      productId: cartData?.data?.cartProducts[productAddedIndex]?.id,
      quantity: productQuantity,
      note: productNote,
    };
    updateCartProduct(productData);
  };

  //delete product
  const deleteProduct = () => {
    // toast.promise(
    //   deleteCartProduct(cartData?.data?.cartProducts[productAddedIndex]?.id),
    //   {
    //     pending: "Removing product...",
    //     success: "Product removed successfully",
    //     error: "Ops! Something went wrong",
    //   }
    // );
    deleteCartProduct(cartData?.data?.cartProducts[productAddedIndex]?.id);
    // setProductNote("");
    // setProductQuantity(1);
  };

  //simplifier functions
  function isUpdateNeeded() {
    return (
      cartData?.data?.cartProducts[productAddedIndex]?.quantity !==
        productQuantity ||
      cartData?.data?.cartProducts[productAddedIndex]?.note !== productNote
    );
  }

  //buttons decider  for  item added to cart and not added items
  const CartButtonOption = () => {
    return productAddedIndex !== -1 && user.isLogged ? (
      <>
        {!isUpdateNeeded() ? (
          <button className={styles["submit"]}>
            Added to cart
            <FontAwesomeIcon icon={faCheck} className={styles["icon"]} />
          </button>
        ) : (
          <button
            className={styles["submit"]}
            onClick={() => {
              if (isUpdateNeeded()) updateCart();
            }}
          >
            {isCartUpdating ? (
              <>
                Updating product <SmallSpinner size="lg" />
              </>
            ) : (
              <>
                Update product{" "}
                <FontAwesomeIcon icon={faMarker} className={styles["icon"]} />
              </>
            )}
          </button>
        )}
        <button
          onClick={() => {
            if (!isProductDeleting) deleteProduct();
          }}
          className={styles["delete"]}
        >
          {isProductDeleting ? (
            <SmallSpinner size="lg" />
          ) : (
            <FontAwesomeIcon icon={faTrash} size="lg" />
          )}
        </button>
      </>
    ) : (
      <button
        className={styles["submit"]}
        onClick={() => {
          if (!isLoading) addToCart();
        }}
      >
        {isLoading ? (
          <>
            Adding to cart <SmallSpinner size="lg" />{" "}
          </>
        ) : (
          <>
            Add to cart
            <FontAwesomeIcon
              icon={faShoppingCart}
              size="lg"
              className={styles["icon"]}
            />
          </>
        )}
      </button>
    );
  };

  return (
    <Container>
      <Head>
        <title>
          {data.data.categoryTitle} | {data.data.title}
        </title>
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
              <CartButtonOption />
            </div>
          </div>
        </div>
      </Section.Container>
    </Container>
  );
}

//serverside
// export async function getServerSideProps(context) {
//   const { slug } = context.query;
//   const res = await rssApi.get(`product/${slug}`);

//   if (!res)
//     return {
//       notFound: true,
//     };

//   return {
//     props: {
//       data: res.data,
//     },
//   };
// }

//ISR implementation

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps({ params }) {
  const res = await rssApi.get(`product/${params.slug}`);

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
  const res = await rssApi.get(`product`);

  // Get the paths we want to pre-render based on posts
  const paths = res.data.data.map((product) => ({
    params: { slug: product.slug },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: "blocking" };
}
