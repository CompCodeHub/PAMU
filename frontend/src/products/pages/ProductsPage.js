import { Container, Row } from "react-bootstrap";
import ProductsList from "../components/ProductsList";

// Products page to display products at /products
const ProductsPage = () => {

  return (
    <Container>
      {/* <Row>
        Filter
      </Row> */}
      <Row>
        <ProductsList />
      </Row>
    </Container>
  );
};

export default ProductsPage;
