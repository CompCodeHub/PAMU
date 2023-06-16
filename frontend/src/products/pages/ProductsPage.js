import { Container } from "react-bootstrap";
import ProductsList from "../components/ProductsList";

// Products page to display products at /products
const ProductsPage = () => {
  return (
    <Container>
      <ProductsList />
    </Container>
  );
};

export default ProductsPage;
