import React from 'react';
import './CrearCuenta.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
function Main_CrearCuenta(){
    return (
        <Container fluid="md">
            <Row>
                <Col className="text-center mx-auto d-block" md={8}>
                    <h1>Crear Cuenta</h1>
                </Col>
            </Row>
            <Row>
                <Col className="text-center mx-auto d-block" md={8}>
                    <p>Ingresa tus datos para crear una cuenta nueva.</p>
                </Col>
            </Row>
            <Container>
                <Form>
                    <Form.Group className="mb-3 white" controlId="form.rut">
                        <Form.Label>RUT</Form.Label>
                        <Form.Control type="number" placeholder="12345678" />
                    </Form.Group>
                    <Form.Group className="mb-3 white" controlId="form.nombres">
                        <Form.Label>Nombres</Form.Label>
                        <Form.Control type="text" placeholder="Marcelo Marcelo" />
                    </Form.Group>
                    <Form.Group className="mb-3 white" controlId="form.apellidopaterno">
                        <Form.Label>Apellido Paterno</Form.Label>
                        <Form.Control type="text" placeholder="Marcelo" />
                    </Form.Group>
                    <Form.Group className="mb-3 white" controlId="form.apellidomaterno">
                        <Form.Label>Apellido Materno</Form.Label>
                        <Form.Control type="text" placeholder="Marcelo" />
                    </Form.Group>
                    <Form.Group className="mb-3 white" controlId="form.telefono">
                        <Form.Label>Teléfono</Form.Label>
                        <Form.Control type="number" placeholder="12345678" />
                    </Form.Group>
                    <Form.Group className="mb-3 white" controlId="form.password">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control type="password" placeholder="12345678" />
                    </Form.Group>
                    <Form.Group className="mb-3 white" controlId="form.password2">
                        <Form.Label>Repetir Contraseña</Form.Label>
                        <Form.Control type="password" placeholder="12345678" />
                    </Form.Group>
                </Form>
            </Container>
        </Container>
    );
}
export default Main_CrearCuenta;