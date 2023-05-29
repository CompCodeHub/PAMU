import {Col, Container, Row} from "react-bootstrap";

// Container for forms
const FormContainer = (props) => {

    return <Container className="mt-5">
        <Row className="justify-content-md-center">
            <Col xs={12} md={6}>
                {props.children}
            </Col>
        </Row>
    </Container>
}

export default FormContainer;