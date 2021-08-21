import {Form, Button, Container, Col, Row} from "react-bootstrap";

const FieldGroup = ({id, label, ...props}) => {
    return (
        <Form.Floating controlId={id} className="mb-3">
            <Form.Control
                id={id}
                placeholder={label}
                {...props}
            />
            <label htmlFor={id}>{label}</label>
        </Form.Floating>
    );
}

export const CreateForm = () => (
    <Container>
        <Row>
            <Col md={{ span: 6, offset: 3 }}>
                <form>
                    <h3>Add New Product</h3>
                    <FieldGroup
                        id="productName"
                        type="text"
                        label="Product Name"
                    />
                    <FieldGroup
                        id="produtDescription"
                        as="textarea"
                        label="Product Description"
                    />
                    <FieldGroup
                        id="productPrice"
                        type="text"
                        label="Product Price"
                    />
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </form>
            </Col>
        </Row>
    </Container>
)
