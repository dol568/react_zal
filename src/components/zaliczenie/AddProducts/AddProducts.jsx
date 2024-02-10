import {useState} from "react";
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

export default function AddProducts({addProduct}) {
    const [form, setForm] = useState({nazwa: '', kategoria: '', produktSpozywczy: false});
    const [errors, setErrors] = useState({});

    const setField = (field, value) => {
        setForm({...form, [field]: value})

        if (!!errors[field]) {
            setErrors({...errors, [field]: null})
        }
    }

    const validateForm = () => {
        const {nazwa, kategoria} = form;
        const newErrors = {};
        if (!nazwa || nazwa.trim() === '') newErrors.nazwa = 'Podaj nazwe produktu';
        if (!kategoria || kategoria.trim() === '') newErrors.kategoria = 'Podaj kategorie';
        return newErrors;
    }

    const handleAddProduct = (event) => {
        event.preventDefault();

        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
        } else {
            addProduct(form);
            setForm({nazwa: '', kategoria: '', produktSpozywczy: false})
        }
    }

    return (
        <Form className="px-5 mx-5 mt-2">
            <Row className="mb-3">
                <Form.Label column="lg" lg={2} className="mx-auto">
                    Add Product
                </Form.Label>
                <Form.Group as={Col} className="m-auto">
                    <Form.Control
                        type="text"
                        placeholder="Nazwa"
                        value={form.nazwa}
                        onChange={(e) => setField('nazwa', e.target.value)}
                        isInvalid={!!errors.nazwa}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.nazwa}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} className="m-auto">
                    <Form.Control
                        type="text"
                        placeholder="Kategoria"
                        value={form.kategoria}
                        onChange={(e) => setField('kategoria', e.target.value)}
                        isInvalid={!!errors.kategoria}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.kategoria}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} className="my-auto">
                    <Form.Check
                        type="checkbox"
                        checked={form.produktSpozywczy}
                        onChange={(e) => setField('produktSpozywczy', e.target.checked)}
                        label="Produkt spożywczy"
                    />
                </Form.Group>
                <Form.Group as={Col} className="my-auto">
                    <Button
                        variant="primary"
                        onClick={handleAddProduct}
                        type="submit"
                        style={{minWidth: '200px'}}
                    >Dodaj
                    </Button>
                </Form.Group>
            </Row>
        </Form>
    );
}

AddProducts.propTypes = {
    addProduct: PropTypes.func
};
