import {Col, Container, Row, Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import axios from "axios";
import {ProductListPagination} from "./ProductListPagination";

export const ProductList = () => {
    const [productData, setProductData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const loadProductData = async () => {
        const response = await axios.get('/products', {params: {
            page: currentPage
        }});
        const responseData = response.data;

        setProductData(responseData.data);
        setTotalPages(responseData.totalPages);
    }

    useEffect( () => {
        loadProductData().then(r => {});
    },[currentPage])

    return (
        <Container>
            <Row>
                <Col md={{span: 12, offset: 0}}>
                    <h2>Product List</h2>
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
                            {productData.map(dataRow => (
                                <tr key={dataRow.id}>
                                    <td>{dataRow.id}</td>
                                    <td>{dataRow.name}</td>
                                    <td>{dataRow.description}</td>
                                    <td>{dataRow.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    { totalPages > 1 ? (
                        <ProductListPagination
                            totalPages={totalPages}
                            currentPage={currentPage}
                            onClick={(e) => {
                                const targetPage = parseInt(e.target.text);
                                if (currentPage === targetPage) {
                                    return;
                                }
                                setCurrentPage(targetPage);
                            }}
                        />
                    ) : '' }
                </Col>
            </Row>
        </Container>
    );
}
