import { useEffect, useContext } from "react";
import protectedRoute from "../../components/auth/ProtectedRoute";
import {
  CartContainer,
  CartProduct,
  CartProductHeader,
  CartSummary,
  EmptyCart,
} from "../../components/Cart";
import { CartContext } from "../../context/CartContextProvider";
import { userApi } from "../../helpers/axios";
import { Container, Section } from "../../components/Containers";
import Head from "next/head";
import { AuthContext } from "../../context/AuthContextProvider";

function Cart() {
  const [cartData, setCartData] = useContext(CartContext);
  const user = useContext(AuthContext);
  const updateCart = new Promise(async (resolve, reject) => {
    try {
      const res = await userApi.get("cart", {
        headers: {
          Authorization: user.access_token,
        },
      });
      if (res) {
        setCartData(res.data.data);
        resolve(true);
      }
    } catch (err) {
      reject(false);
    }
  });

  return (
    <Container>
      <Head>
        <title>KhaneKura | Cart</title>
      </Head>
      <Section.Container>
        {!cartData ? (
          <div>Loading...</div>
        ) : cartData.cartProducts.length !== 0 ? (
          <>
            <div>
              {cartData.cartProducts.length === 0 && <p>No items in cart</p>}
            </div>
            <CartContainer>
              <CartProductHeader />
              {cartData.cartProducts.map((productData) => (
                <CartProduct
                  key={productData.id}
                  updateCart={updateCart}
                  productData={productData}
                />
              ))}
            </CartContainer>
            <CartSummary
              productCost={cartData.orderAmount}
              subTotal={cartData.subTotal}
              discount={cartData.discount}
              deliveryCharge={cartData.deliveryCharge}
              grandTotal={cartData.total}
              cartNumber={cartData.cartNumber}
            />
          </>
        ) : (
          <EmptyCart />
        )}
      </Section.Container>
    </Container>
  );
}

export default protectedRoute(Cart);
