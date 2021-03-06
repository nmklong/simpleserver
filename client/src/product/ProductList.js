import {Col, Container, Row, Table, Button} from "react-bootstrap";
import {useEffect, useState} from "react";
import axios from "axios";
import {ProductListPagination} from "./ProductListPagination";
import {ProductListHeaderItem} from "./ProductListHeaderItem";
import { useHistory } from "react-router-dom";


export const ProductList = () => {
    const [productData, setProductData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sortBy, setSortBy] = useState(-1);
    const [sortByColumn, setSortByColumn] = useState('id');

    useEffect( () => {
        const getSortByParam = () => {
            return (sortBy > 0 ? '' : '-') + sortByColumn;
        }
        const loadProductData = async () => {
            const response = await axios.get('/products', {params: {
                    page: currentPage,
                    sort: getSortByParam()
                }});
            const responseData = response.data;

            setProductData(responseData.data);
            setTotalPages(responseData.totalPages);
        }

        loadProductData().then(r => {});
    },[currentPage, sortBy, sortByColumn])

    const toggleSortBy = (column) => {
        setSortByColumn(column);
        setSortBy(sortBy * -1);
    }

    const history = useHistory();

    return (
        <Container>
            <Row>
                <Col md={{span: 12, offset: 0}}>
                    <h2>Product List</h2>
                    <Button
                        variant="primary"
                        onClick={(e) => {
                            history.push("/create-product")
                        }}
                    >Create Product</Button>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <ProductListHeaderItem
                                    toggleSortBy={toggleSortBy}
                                    columnLabel='ID'
                                    columnId='id'
                                />
                                <ProductListHeaderItem
                                    toggleSortBy={toggleSortBy}
                                    columnLabel='Name'
                                    columnId='name'
                                    className="w-25"
                                />
                                <ProductListHeaderItem
                                    toggleSortBy={toggleSortBy}
                                    columnLabel='Description'
                                    columnId='description'
                                    className="w-50"
                                />
                                <ProductListHeaderItem
                                    toggleSortBy={toggleSortBy}
                                    columnLabel='Price'
                                    columnId='price'
                                />
                                <th/>
                            </tr>
                        </thead>
                        <tbody>
                            {productData.map(dataRow => (
                                <tr key={dataRow.id}>
                                    <td>{dataRow.id}</td>
                                    <td>{dataRow.name}</td>
                                    <td>{dataRow.description}</td>
                                    <td>{dataRow.price}</td>
                                    <td className='text-center'>
                                        <a href={`/view-product/${dataRow.id}`}>View</a>
                                    </td>
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
