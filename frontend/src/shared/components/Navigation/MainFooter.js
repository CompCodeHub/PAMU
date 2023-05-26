import { Container, Row, Col } from "react-bootstrap";


const MainFooter = (props) => {
  return (
    <footer>
     <Container>
      <Row>
        <Col className="text-center py-3 text-muted">
          Copyright &copy; PAMU
        </Col>
      </Row>
     </Container>
    </footer>
  );
};

export default MainFooter;
