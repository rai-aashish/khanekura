import { useCallback } from "react";
import protectedRoute from "../../components/auth/ProtectedRoute";
import {
  CartContainer,
  CartProduct,
  CartProductHeader,
  CartSummary,
  EmptyCart,
} from "../../components/Cart";
import { Container, Section } from "../../components/Containers";
import Head from "next/head";
import { userApi } from "../../redux/apiStore";

function Cart() {
  const { data: cart, isLoading} = userApi.useGetCartQuery();
  const [updateCartProduct] = userApi.useUpdateCartProductMutation();

  const onUpdateProduct = useCallback(
    (productData) => updateCartProduct(productData),
    [updateCartProduct]
  );

  return (
    <Container>
      <Head>
        <title>KhaneKura | Cart</title>
      </Head>

      <Section.Container>
        {isLoading ? (
          <div>Loading...</div>
        ) : cart?.data.cartProducts.length !== 0 ? (
          <>
            <div>
              {cart?.data.cartProducts.length === 0 && <p>No items in cart</p>}
            </div>
            <CartContainer>
              <CartProductHeader />
              {cart?.data.cartProducts.map((productData) => (
                <CartProduct
                  key={productData.id}
                  productData={productData}
                  updateCart={onUpdateProduct}
                />
              ))}
            </CartContainer>
            <CartSummary
              productCost={cart?.data.orderAmount}
              subTotal={cart?.data.subTotal}
              discount={cart?.data.discount}
              deliveryCharge={cart?.data.deliveryCharge}
              grandTotal={cart?.data.total}
              cartNumber={cart?.data.cartNumber}
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
