import styles from "../styles/components/cart.module.scss";
import Image from "next/image";
import { userApi } from "../helpers/axios";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faTimes,
  faMinus,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import emptyCartImage from "../assets/images/cartEmpty.png";
import Link from "next/link";
import { SmallSpinner } from "./Spinners";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider";

export const CartContainer = ({ children }) => {
  return <div className={styles["cart-container"]}>{children}</div>;
};

export function CartProduct({ productData, updateCart }) {
  const [blockAction, setBlockAction] = useState(false);
  const user = useContext(AuthContext);
  //delete product
  const deleteProduct = async (productId) => {
    try {
      setBlockAction(true);
      toast
        .promise(
          userApi.delete(`cart-product/${productId}`, {
            headers: {
              Authorization: user.access_token,
            },
          }),
          {
            pending: "Removing product from cart...",
            success: "Product removed successfully",
            error: "Ops! Something went wrong",
          }
        )
        .then(() => updateCart)
        .then(() => setBlockAction(false));
    } catch (err) {
      toast.error("Couldn't complete the process");
      setBlockAction(false);
    }
  };
  return (
    <div className={styles["cart-item-container"]}>
      <div className={styles["cart-item"]}>
        <div>
          <Image
            src={productData.product.images[0].imageName}
            layout="fill"
            objectFit="contain"
            alt={productData.product.title}
            priority="false"
          />
        </div>
        <div>{productData.product.title}</div>
        <div>Nrs.{productData.product.unitPrice[0].sellingPrice}</div>
        <div>
          <QuantityHandle
            quantity={productData.quantity}
            cartProductId={productData.id}
            updateCart={updateCart}
          />
        </div>
        <div>Nrs.{productData.price}</div>
        <div>
          <button
            onClick={() => {
              if (!blockAction) deleteProduct(productData.id);
            }}
          >
            {blockAction ? (
              <SmallSpinner />
            ) : (
              <FontAwesomeIcon icon={faTimes} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

const QuantityHandle = ({ quantity, cartProductId, updateCart }) => {
  const [newQuantity, setNewQuantity] = useState(quantity);
  const [blockAction, setBlockAction] = useState(false);
  const user = useContext(AuthContext);

  const handleQuantityChange = (quantity) => {
    if (quantity < 1) quantity = 1;
    setNewQuantity(quantity);
  };

  const handleQuantityUpdate = async () => {
    try {
      setBlockAction(true);
      toast
        .promise(
          userApi.patch(
            `cart-product/${cartProductId}`,
            {
              quantity: newQuantity,
            },
            {
              headers: {
                Authorization: user.access_token,
              },
            }
          ),
          {
            pending: "Updating product in cart...",
            success: "Cart updated successfully",
            error: "Ops! Something went wrong",
          }
        )
        .then(() => updateCart)
        .then(() => setBlockAction(false));
    } catch (err) {
      console.log(err);
      setBlockAction(false);
    }
  };

  return (
    <div className={styles["cart-item__handle-quantity"]}>
      <button onClick={() => handleQuantityChange(newQuantity + 1)}>
        <FontAwesomeIcon icon={faPlus} />
      </button>
      <span>{newQuantity}</span>
      <button onClick={() => handleQuantityChange(newQuantity - 1)}>
        <FontAwesomeIcon icon={faMinus} />
      </button>
      {quantity != newQuantity && (
        <button
          onClick={() => {
            if (!blockAction) handleQuantityUpdate();
          }}
          className={styles["update-btn"]}
        >
          {blockAction ? <SmallSpinner /> : <FontAwesomeIcon icon={faCheck} />}
        </button>
      )}
    </div>
  );
};

//header
export const CartProductHeader = () => {
  return (
    <div className={styles["cart-item-container"]}>
      <div className={`${styles["cart-item"]} ${styles["cart-item--header"]}`}>
        <div>Image </div>
        <div>Name</div>
        <div>Unit cost</div>
        <div>Quantity</div>
        <div>Sub total</div>
        <div>Remove</div>
      </div>
    </div>
  );
};

//cart summary
export const CartSummary = ({
  productCost,
  subTotal,
  discount,
  deliveryCharge,
  grandTotal,
  cartNumber,
}) => {
  return (
    <div className={styles["cart-summary"]}>
      <div className={styles["cart-summary__title"]}>Cart Summary</div>
      <div className={styles["cart-summary__item"]}>
        <span>Cart number</span>
        <span>{cartNumber}</span>
      </div>
      <div className={styles["cart-summary__item"]}>
        <span>Products cost</span>
        <span>NRs {productCost}</span>
      </div>

      <div className={styles["cart-summary__item"]}>
        <span>Sub total</span>
        <span>NRs {subTotal}</span>
      </div>

      <div className={styles["cart-summary__item"]}>
        <span>Discount</span>
        <span>- NRs {discount}</span>
      </div>

      <div className={styles["cart-summary__item"]}>
        <span>Deliver charge</span>
        <span>NRs {deliveryCharge}</span>
      </div>

      <div
        className={`${styles["cart-summary__item"]} ${styles["cart-summary__item--grand-total"]}`}
      >
        <span>Grand Total</span>
        <span>NRs {grandTotal}</span>
      </div>

      <div className={styles["checkout"]}>
        <Link href="/user/checkout">
          <a>CHECKOUT</a>
        </Link>
      </div>
    </div>
  );
};

CartSummary.defaultProps = {
  productCost: 0,
  subTotal: 0,
  discount: 0,
  deliveryCharge: 0,
  grandTotal: 0,
};

//no cart items display block
export const EmptyCart = () => {
  return (
    <div className={styles["cart-empty"]}>
      <div className={styles["image"]}>
        <Image
          src={emptyCartImage}
          objectFit="scale-down"
          alt="cart empty image"
          layout="fill"
        />
      </div>
      <div className={styles["message"]}>
        <h2>Your shopping cart is empty.</h2>

        <div className={styles["redirects"]}>
          <Link href="/">
            <a>Shop Now</a>
          </Link>
        </div>
      </div>
    </div>
  );
};
