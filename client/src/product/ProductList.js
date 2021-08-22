import {Col, Container, Row, Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import axios from "axios";

export const ProductList = () => {
    const [productData, setProductData] = useState([]);

    useEffect( () => {
        const loadProductData = async () => {
            const response = await axios.get('/products');
            setProductData(response.data);
        }

        loadProductData().then(r => {});
    }, [])

    return (
        <Container>
            <Row>
                <Col md={{span: 12, offset: 0}}>
                    <Table variant="dark">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productData.map(dataRow => {
                                return (<tr>
                                    <td>{dataRow.id}</td>
                                    <td>{dataRow.name}</td>
                                    <td>{dataRow.description}</td>
                                    <td>{dataRow.price}</td>
                                </tr>)
                            })}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
}
