import commonColumnsStyles from "../../../common/styles/Columns.module.scss";
import {Table} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useEffect, useState} from "react";
import CustomPagination from "../Pagination/CustomPagination.jsx";
import PropTypes from "prop-types";

const PAGE_SIZE = 10;

function getLineThroughProducts() {
    const storedLineThrough = localStorage.getItem('lineThrough');
    return storedLineThrough ? JSON.parse(storedLineThrough) : {};
}

export default function ShoppingList({onDeleteProduct, selectedProducts}) {
    const [sortParams, setSortParams] = useState({order: 'asc', field: 'nazwa'});
    const [currentPage, setCurrentPage] = useState(1);
    const [paginatedData, setPaginatedData] = useState([]);
    const [lineThroughProducts, setLineThroughProducts] = useState(getLineThroughProducts());

    useEffect(() => {
        if (!selectedProducts.length) {
            setLineThroughProducts({});
        }
        const sorted = selectedProducts.slice().sort((a, b) => {
            const comparison = a[sortParams.field].localeCompare(b[sortParams.field]);
            return sortParams.order === 'asc' ? comparison : -comparison;
        });
        const startIndex = (currentPage - 1) * PAGE_SIZE;
        const endIndex = currentPage * PAGE_SIZE;
        const sortedData = sorted.slice(startIndex, endIndex);
        setPaginatedData(sortedData);

    }, [sortParams, currentPage, selectedProducts]);

    useEffect(() => {
        localStorage.setItem('lineThrough', JSON.stringify(lineThroughProducts));
    }, [lineThroughProducts]);

    const handleLeftMouseButtonClick = (e, id) => {
        if (lineThroughProducts[id]) {
            const updatedLineThroughProducts = {...lineThroughProducts};
            delete updatedLineThroughProducts[id];
            setLineThroughProducts(updatedLineThroughProducts);
        }
        onDeleteProduct(id);
    };

    const handleRightMouseButtonClick = (e, id) => {
        e.preventDefault();
        const updatedLineThroughProducts = {...lineThroughProducts};
        updatedLineThroughProducts[id] = !updatedLineThroughProducts[id];
        setLineThroughProducts(updatedLineThroughProducts);
    };

    const sortProducts = (field) => {
        sortParams.field === field
            ? setSortParams({...sortParams, order: sortParams.order === 'asc' ? 'desc' : 'asc'})
            : setSortParams({field: field, order: 'asc'})
    };

    const emptyShoppingListRow = (
        <tr>
            <td colSpan={4}>Shopping list is empty...</td>
        </tr>
    );

    const totalElementsRow = (
        <tr>
            <td colSpan={4}>Total: {selectedProducts.length}</td>
        </tr>
    );

    return (
        <div className={commonColumnsStyles.App}>
            <header className={commonColumnsStyles.AppHeader}>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <p style={{margin: 0}}>Shopping List</p>

                </div>
                <Table striped bordered hover size="sm" variant="dark"
                       style={{width: '80%', fontSize: '1.2rem', marginTop: '15px'}}>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th onClick={() => sortProducts('nazwa')}>Nazwa</th>
                        <th onClick={() => sortProducts('kategoria')}>Kategoria</th>
                        <th>Product Spożywczy</th>
                    </tr>
                    </thead>
                    <tbody>
                    {paginatedData.length === 0 && emptyShoppingListRow}
                    {paginatedData.map((product, index) => (
                        <tr
                            key={product.id}
                            onClick={(e) => handleLeftMouseButtonClick(e, product.id)}
                            onContextMenu={(e) => handleRightMouseButtonClick(e, product.id)}
                            style={{
                                cursor: 'pointer',
                                textDecoration: lineThroughProducts[product.id] ? 'line-through' : 'auto'
                            }}
                        >
                            <td>{(currentPage - 1) * PAGE_SIZE + index + 1}</td>
                            <td>{product.nazwa}</td>
                            <td>{product.kategoria}</td>
                            <td>{product.produktSpozywczy ? 'Tak' : 'Nie'}</td>
                        </tr>
                    ))}
                    {paginatedData.length > 0 && totalElementsRow}
                    </tbody>
                </Table>
                <div style={{width: '80%', fontSize: '1.2rem', display: "flex", flexDirection: 'row-reverse'}}>
                    <CustomPagination
                        itemsCount={selectedProducts.length}
                        itemsPerPage={PAGE_SIZE}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        alwaysShown={false}
                    />
                </div>
            </header>
        </div>
    );
}

ShoppingList.propTypes = {
    onDeleteProduct: PropTypes.func,
    selectedProducts: PropTypes.array
};
