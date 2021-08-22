import {Pagination} from "react-bootstrap";

export const ProductListPagination = ({totalPages, currentPage, onClick}) => {
    let pageItems = [];
    for (let i = 1; i <= totalPages; ++i) {
        pageItems.push(
            <Pagination.Item
                key={i}
                active={currentPage === i}
                onClick={onClick}
            >
                {i}
            </Pagination.Item>
        );
    }

    return (
        <Pagination>
            {pageItems}
        </Pagination>
    )
}
