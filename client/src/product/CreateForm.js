import {Form, Button, Container, Col, Row} from "react-bootstrap";
import {useForm} from "react-hook-form";
import axios from "axios";
import {useHistory, useParams} from "react-router-dom";
import {useEffect} from "react";


export const CreateForm = () => {
    const {register, handleSubmit, reset} = useForm();
    const { productId } = useParams();

    useEffect( () => {
        const fetchProductData = async () => {
            const response = await axios.get(`/products/${productId}`);
            reset({
                'productName': response.data.name,
                'productDescription': response.data.description,
                'productPrice': response.data.price
            })
        }

        if (productId) {
            fetchProductData();
        }
    }, [productId, reset])

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
                    {...props}
                    {...register(id)}
                />
                <label htmlFor={id}>{label}</label>
            </Form.Floating>
        );
    }
    const history = useHistory();

    const submitAddingProduct = async (data) => {
        console.log(data);
        const productData = {
            name: data.productName,
            description: data.productDescription,
            price: data.productPrice
        }

        if (productId) {
            productData.id = productId;
            await axios.put('/products', productData);
            history.push(`/view-product/${productId}`);
        } else {
            const response = await axios.post('/products', productData);
            history.push(`/view-product/${response.data.id}`);
        }

    }

    return (
        <Container>
            <Row>
                <Col md={{span: 6, offset: 3}}>
                    <Form onSubmit={handleSubmit(submitAddingProduct)}>
                        <h3>
                            {productId ? `Edit Product #${productId}` : 'Add New Product'}
                        </h3>
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
