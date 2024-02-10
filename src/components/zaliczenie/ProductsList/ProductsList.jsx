import commonColumnsStyles from "../../../common/styles/Columns.module.scss";
import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import {ListGroup} from "react-bootstrap";

export default function ProductsList({addToShoppingList, filteredProducts}) {
    const [sortedProducts, setSortedProducts] = useState([]);
    const [sortOrder, setSortOrder] = useState('asc');
    const [activeIndex, setActiveIndex] = useState(null);
    const [counterId, setCounterId] = useState(1);

    useEffect(() => {
        sortProducts(filteredProducts)
    }, [filteredProducts, sortOrder]);

    const handleProductsList = (index, selectedProduct) => {
        setActiveIndex(activeIndex === index ? null : index)
        const selectedProductWithId = {...selectedProduct, id: counterId}
        addToShoppingList(selectedProductWithId);
        setCounterId(counterId + 1);
    }

    const mappedProductsList = () => (
        sortedProducts.length > 0 ? (
            <ListGroup style={{fontSize: '1.2rem', width: '300px'}}>
                {sortedProducts.map((product, index) => (
                    <ListGroup.Item
                        key={index}
                        onClick={() => handleProductsList(index, product)}
                        style={{cursor: 'pointer'}}
                        active={index === activeIndex}
                        variant="dark"
                    >
                        {product.nazwa}
                    </ListGroup.Item>

                ))}
            </ListGroup>
        ) : (
            <small>No products found...</small>
        )
    );

    const sortProducts = (products) => {
        const sorted = [...products];
        if (sortOrder === 'asc') sorted.sort((a, b) => a.nazwa.localeCompare(b.nazwa));
        else sorted.sort((a, b) => b.nazwa.localeCompare(a.nazwa));

        setSortedProducts(sorted);
    };

    const toggleSortOrder = () => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');

    return (
        <div className={commonColumnsStyles.App}>
            <header className={commonColumnsStyles.AppHeader}>
                <div onClick={toggleSortOrder}
                     style={{display: "flex", flexDirection: 'row', alignItems: "center", gap: '20px'}}>
                    <p>Products list</p>
                    <i className={(sortOrder === 'asc') ? "fa fa-caret-down" : "fa fa-caret-up"}
                       style={{marginBottom: (sortOrder === 'asc') ? '10px' : '20px'}}></i>
                </div>
                {mappedProductsList()}
            </header>
        </div>
    );
};

ProductsList.propTypes = {
    addToShoppingList: PropTypes.func,
    filteredProducts: PropTypes.array
};
