import React from "react";
import ProductsList from "../../products/components/ProductsList";
import { Container, Row, Image } from "react-bootstrap";

// Home page for the app
const Home = () => {

  return (
    <React.Fragment>
      <Container>
        <Row>
          <Image
            src="https://www.thespruce.com/thmb/5qM7m9wZ--BSDRyBQlG-ZTHxtdY=/fit-in/1500x1000/filters:no_upscale():max_bytes(150000):strip_icc()/SPR-jaxx-cocoon-microsuede-bean-bag-07-badge-2bc17d39777d491986b11d25903bccda.jpg"
            fluid
          />
        </Row>
        <Row>
          <h1 className="text-center mt-5 mb-5">Featured Products</h1>
          <ProductsList />
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default Home;
