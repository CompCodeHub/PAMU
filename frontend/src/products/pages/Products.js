import { Container } from "react-bootstrap";
import ProductsList from "../components/ProductsList";

// Products page to display products at /products
const Products = (props) => {
  return (
    <Container>
      <ProductsList />
    </Container>
  );
};

export default Products;
