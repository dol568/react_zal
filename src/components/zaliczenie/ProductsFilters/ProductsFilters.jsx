import PropTypes from "prop-types";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

export default function ProductsFilters({products, resetList, filters, setFilters}) {

    const resetFilterParams = () => {
        setFilters({
            nazwa: '',
            kategoria: '',
            produktSpozywczy: false
        });
    };

    const onNameFilterChange = (e) => {
        setFilters({...filters, nazwa: e.target.value});
    };

    const onCategoryFilterChange = (e) => {
        setFilters({...filters, kategoria: e.target.value});
    };

    const onFoodOnlyChange = (e) => {
        setFilters({...filters, produktSpozywczy: e.target.checked});
    };

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
                        value={filters.nazwa}
                        placeholder="Filter by name..."
                        onChange={onNameFilterChange}
                    />
                </Form.Group>
                <Form.Group as={Col} className="m-auto">
                    <Form.Select
                        value={filters.kategoria}
                        onChange={onCategoryFilterChange}
                    >
                        <option value="">All Categories</option>
                        {uniqueCategories.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group as={Col} className="my-auto">
                    <Form.Check
                        type="checkbox"
                        checked={filters.produktSpozywczy}
                        onChange={onFoodOnlyChange}
                        label="Tylko produkty spożywcze"
                    />
                </Form.Group>
                <Form.Group as={Col} className="my-auto">
                    <Button
                        className="my-auto mx-3"
                        onClick={resetFilterParams}
                        style={{minWidth: '200px'}}
                    >Reset Filters
                    </Button>
                </Form.Group>
                <Form.Group as={Col} className="my-auto">
                    <Button
                        className="my-auto"
                        onClick={resetList}
                        style={{minWidth: '200px'}}
                    >Reset List
                    </Button>
                </Form.Group>
            </Row>
        </Form>
    );
}

ProductsFilters.propTypes = {
    products: PropTypes.array,
    resetList: PropTypes.func,
    filters: PropTypes.object,
    setFilters: PropTypes.func
};
