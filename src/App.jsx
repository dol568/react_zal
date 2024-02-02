import styles from "./App.module.scss";
import AddProducts from "./components/zaliczenie/AddProducts/AddProducts";
import ProductsFilters from "./components/zaliczenie/ProductsFilters/ProductsFilters";
import ProductsList from "./components/zaliczenie/ProductsList/ProductsList";
import ShoppingList from "./components/zaliczenie/ShopingList/ShopingList";
import {useEffect, useState} from "react";
import {produkty} from './common/consts/produkty';

function App() {
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [nameFilter, setNameFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [isFoodOnly, setIsFoodOnly] = useState(false);

    useEffect(() => {
        const storedProducts = localStorage.getItem('products');
        if (storedProducts) {
            setProducts(JSON.parse(storedProducts));
        } else {
            localStorage.setItem('products', JSON.stringify(produkty));
            setProducts(produkty);
        }
        const savedShoppingList = localStorage.getItem('shoppingList');
        if (savedShoppingList)
            setSelectedProducts(JSON.parse(savedShoppingList));
    }, []);

    useEffect(() => {
        localStorage.setItem('shoppingList', JSON.stringify(selectedProducts));
    }, [selectedProducts]);

    useEffect(() => {
        const filterProducts = products.filter(product => {
            const nameMatch = product.nazwa.toLowerCase().includes(nameFilter.toLowerCase());
            const categoryMatch = categoryFilter === '' || product.kategoria === categoryFilter;
            const isFoodMatch = !isFoodOnly || product.produktSpozywczy === true;

            return nameMatch && categoryMatch && isFoodMatch;
        });
        setFilteredProducts(filterProducts);

    }, [nameFilter, categoryFilter, isFoodOnly, products]);

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
            <AddProducts addProduct={addProduct}/>
            <ProductsFilters
                products={products}
                resetList={resetList}
                nameFilter={nameFilter}
                categoryFilter={categoryFilter}
                isFoodOnly={isFoodOnly}
                setNameFilter={setNameFilter}
                setCategoryFilter={setCategoryFilter}
                setIsFoodOnly={setIsFoodOnly}
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

export default App;
