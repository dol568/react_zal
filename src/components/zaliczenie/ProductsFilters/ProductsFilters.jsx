import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const ProductsFilters = ({
                             products,
                             resetList,
                             nameFilter,
                             setNameFilter,
                             categoryFilter,
                             setCategoryFilter,
                             isFoodOnly,
                             setIsFoodOnly
                         }) => {

    const resetFilterParams = () => {
        setNameFilter('');
        setCategoryFilter('');
        setIsFoodOnly(false);
    };

    const onNameFilterChange = (e) => setNameFilter(e.target.value);

    const onCategoryFilterChange = (e) => setCategoryFilter(e.target.value);

    const onFoodOnlyChange = (e) => setIsFoodOnly(e.target.checked);

    const uniqueCategories = products.reduce((unique, product) => {
        if (!unique.includes(product.kategoria))
            unique.push(product.kategoria);
        return unique;
    }, [])

    return (
        <Form className="px-5 mx-5 mt-2">
            <Row className="mb-3">
                <Form.Label column="lg" lg={2} className="mx-auto">
                    Products Filters
                </Form.Label>
                <Form.Group as={Col} className="m-auto">
                    <Form.Control
                        type="text"
                        value={nameFilter}
                        placeholder="Filter by name..."
                        onChange={onNameFilterChange}
                    />
                </Form.Group>
                <Form.Group as={Col} className="m-auto">
                    <Form.Select
                        value={categoryFilter}
                        onChange={onCategoryFilterChange}
                    >
                        <option value="">All Categories</option>
                        {uniqueCategories.map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group as={Col} className="my-auto">
                    <Form.Check
                        type="checkbox"
                        checked={isFoodOnly}
                        onChange={onFoodOnlyChange}
                        label="Tylko produkty spożywcze"
                    />
                </Form.Group>
                <Form.Group as={Col} className="my-auto">
                    <Button
                        className="my-auto mx-3"
                        onClick={resetFilterParams}
                        style={{minWidth: '200px'}}
                    >
                        Reset Filters
                    </Button>
                </Form.Group>
                <Form.Group as={Col} className="my-auto">
                    <Button
                        className="my-auto"
                        onClick={resetList}
                        style={{minWidth: '200px'}}
                    >
                        Reset List
                    </Button>
                </Form.Group>
            </Row>
        </Form>
    );
}

export default ProductsFilters;
