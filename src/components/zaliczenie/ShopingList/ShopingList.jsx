import commonColumnsStyles from "../../../common/styles/Columns.module.scss";
import {Table} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useEffect, useState} from "react";
import CustomPagination from "../Pagination/CustomPagination.jsx";

const ShoppingList = ({onDeleteProduct, selectedProducts}) => {
    const [sortOrder, setSortOrder] = useState('asc');
    const [sortField, setSortField] = useState('nazwa');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);
    const [paginatedData, setPaginatedData] = useState([]);
    const [lineThroughProducts, setLineThroughProducts] = useState({});

    useEffect(() => {
        if (selectedProducts.length === 0) {
            setLineThroughProducts({});
        }
        const sorted = selectedProducts.slice().sort((a, b) => {
            const comparison = a[sortField].localeCompare(b[sortField]);
            return sortOrder === 'asc' ? comparison : -comparison;
        });
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = currentPage * pageSize;
        setPaginatedData(sorted.slice(startIndex, endIndex));
    }, [sortField, sortOrder, currentPage, selectedProducts]);

    useEffect(() => {
        const storedLineThrough = JSON.parse(localStorage.getItem('lineThrough')) || {};
        setLineThroughProducts(storedLineThrough);
    }, []);

    useEffect(() => {
        localStorage.setItem('lineThrough', JSON.stringify(lineThroughProducts));
    }, [lineThroughProducts]);

    const handleLeftMouseButtonClick = (e, id) => {
        const updatedLineThroughProducts = {...lineThroughProducts};
        delete updatedLineThroughProducts[id];
        setLineThroughProducts(updatedLineThroughProducts);
        onDeleteProduct(id);
    };

    const handleRightMouseButtonClick = (e, id) => {
        e.preventDefault();
        const updatedLineThroughProducts = {...lineThroughProducts};
        updatedLineThroughProducts[id] = !updatedLineThroughProducts[id];
        setLineThroughProducts(updatedLineThroughProducts);
    };

    const sortProducts = (field) => {
        if (sortField === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortOrder('asc');
        }
    };

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
                    {paginatedData.length === 0 && (
                        <tr>
                            <td colSpan={4}>Shopping list is empty...</td>
                        </tr>
                    )}
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
                            <td>{(currentPage - 1) * pageSize + index + 1}</td>
                            <td>{product.nazwa}</td>
                            <td>{product.kategoria}</td>
                            <td>{product.produktSpozywczy ? 'Tak' : 'Nie'}</td>
                        </tr>
                    ))}
                    {paginatedData.length > 0 && (
                        <tr>
                            <td colSpan={4}>Total: {selectedProducts.length}</td>
                        </tr>
                    )}
                    </tbody>
                </Table>
                <div style={{width: '80%', fontSize: '1.2rem', display: "flex", flexDirection: 'row-reverse'}}>
                    <CustomPagination
                        itemsCount={selectedProducts.length}
                        itemsPerPage={pageSize}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        alwaysShown={true}
                    />
                </div>
            </header>
        </div>
    );
}

export default ShoppingList;
