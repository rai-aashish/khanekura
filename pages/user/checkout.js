import protectedRoute from "../../components/auth/ProtectedRoute";
import { Container, Section } from "../../components/Containers";
function Checkout() {
  return <Container>
      <Section.Container>
          <div className="checkout">
              checkout
          </div>
      </Section.Container>
  </Container>;
}

export default protectedRoute(Checkout);
