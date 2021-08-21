import {Form, Button, Container, Col, Row} from "react-bootstrap";
import {useForm} from "react-hook-form";
import axios from "axios";


export const CreateForm = () => {
    const {register, handleSubmit} = useForm();

    const FieldGroup = ({
        id,
        label,
        ...props
    }) => {
        return (
            <Form.Floating className="mb-3">
                <Form.Control
                    id={id}
                    placeholder={label}
                    {...register(id)}
                    {...props}
                />
                <label htmlFor={id}>{label}</label>
            </Form.Floating>
        );
    }

    const submitAddingProduct = async (data) => {
        console.log(data);

        await axios.post('/createProduct', data);
    }

    return (
        <Container>
            <Row>
                <Col md={{span: 6, offset: 3}}>
                    <Form onSubmit={handleSubmit(submitAddingProduct)}>
                        <h3>Add New Product</h3>
                        <FieldGroup
                            id="productName"
                            type="text"
                            label="Product Name"
                        />
                        <FieldGroup
                            id="productDescription"
                            as="textarea"
                            label="Product Description"
                        />
                        <FieldGroup
                            id="productPrice"
                            type="text"
                            label="Product Price"
                        />
                        <Button
                            variant="primary"
                            type="submit"
                        >
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}
