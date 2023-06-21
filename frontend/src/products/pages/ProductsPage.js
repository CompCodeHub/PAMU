import { Container, Row } from "react-bootstrap";
import ProductsList from "../components/ProductsList";
import Meta from "../../shared/components/Utilities/Meta";

// Products page to display products at /products
const ProductsPage = () => {

  return (
    <Container>
      <Meta title="Shop" />
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
