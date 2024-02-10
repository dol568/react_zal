import styles from "./App.module.scss";
import AddProducts from "./components/zaliczenie/AddProducts/AddProducts";
import ProductsFilters from "./components/zaliczenie/ProductsFilters/ProductsFilters";
import ProductsList from "./components/zaliczenie/ProductsList/ProductsList";
import ShoppingList from "./components/zaliczenie/ShopingList/ShopingList";
import {useEffect, useState} from "react";
import {produkty} from './common/consts/produkty';

function getProducts() {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
        return JSON.parse(storedProducts);
    } else {
        localStorage.setItem('products', JSON.stringify(produkty));
        return JSON.parse(localStorage.getItem('products'));
    }
}

function getShoppingList() {
    const savedShoppingList = localStorage.getItem('shoppingList');
    return savedShoppingList ? JSON.parse(savedShoppingList) : [];
}

export default function App() {
    const [products, setProducts] = useState(getProducts());
    const [selectedProducts, setSelectedProducts] = useState(getShoppingList());
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filters, setFilters] = useState({
        nazwa: '',
        kategoria: '',
        produktSpozywczy: false
    });

    useEffect(() => {
        localStorage.setItem('shoppingList', JSON.stringify(selectedProducts));
    }, [selectedProducts]);

    useEffect(() => {
        const filterProducts = products.filter(product => {
            const nameMatch = product.nazwa.toLowerCase().includes(filters.nazwa.toLowerCase());
            const categoryMatch = filters.kategoria === '' || product.kategoria === filters.kategoria;
            const isFoodMatch = !filters.produktSpozywczy || product.produktSpozywczy === true;

            return nameMatch && categoryMatch && isFoodMatch;
        });
        setFilteredProducts(filterProducts);

    }, [filters, products]);

    const addProduct = (form) => {
        const newProduct = {
            nazwa: form.nazwa,
            kategoria: form.kategoria,
            produktSpozywczy: form.produktSpozywczy
        }
        setProducts(prevProducts => [...prevProducts, newProduct]);
        localStorage.setItem('products', JSON.stringify([...products, newProduct]));
    }

    const addToShoppingList = (selectedProduct) => {
        setSelectedProducts(prevSelectedProducts => [...prevSelectedProducts, selectedProduct]);
    }

    const deleteProduct = (id) => {
        setSelectedProducts(prevSelectedProducts => prevSelectedProducts.filter(product => product.id !== id));
    }

    const resetList = () => setSelectedProducts([]);

    return (
        <div className={styles.appWrapper}>
            <AddProducts
                addProduct={addProduct}
            />
            <ProductsFilters
                products={products}
                resetList={resetList}
                filters={filters}
                setFilters={setFilters}
            />
            <div className={styles.columnsWrapper}>
                <ProductsList
                    addToShoppingList={addToShoppingList}
                    filteredProducts={filteredProducts}
                />
                <div style={{display: "flex", flexDirection: "column"}}>
                    <ShoppingList
                        onDeleteProduct={deleteProduct}
                        selectedProducts={selectedProducts}
                    />
                </div>
            </div>
        </div>
    );
}
