import {useHistory, useParams} from "react-router-dom";
import {Button, Col, Container, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import axios from "axios";

export const ProductView = () => {
    const { id } = useParams();
    const [productData, setProductData] = useState({});

    useEffect( () => {
        const fetchProductData = async () => {
            const response = await axios.get(`/products/${id}`);
            setProductData(response.data);
        }

        fetchProductData();
    }, [])

    const history = useHistory();

    return (
        <Container>
            <Row>
                <Col className='bg-light' md={{span: 12, offset: 0}}>
                    <h1>
                        Product ID: {productData.id}
                        <Button
                            variant='primary'
                            onClick={(e) => {
                                history.push(`/edit-product/${id}`)
                            }}
                        > Edit </Button>
                    </h1>
                    <h3>Name</h3>
                    <p>{productData.name}</p>
                    <h3>Price</h3>
                    <p>{productData.price}</p>
                    <h3>Description</h3>
                    <p>{productData.description}</p>
                </Col>
            </Row>
        </Container>
    )
}
