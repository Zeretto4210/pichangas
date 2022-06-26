import {React, useState} from 'react';
import './CrearCuenta.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import {db} from './../../firebase';
import {setDoc, doc, Timestamp} from 'firebase/firestore';


function Main_CrearCuenta(){
    const [form_rut, setform_rut] = useState('');
    const [form_nombres, setform_nombres] = useState('');
    const [form_apellidopaterno, setform_apellidopaterno] = useState('');
    const [form_apellidomaterno, setform_apellidomaterno] = useState('');
    const [form_telefono, setform_telefono] = useState('');
    const [form_password, setform_password] = useState('');

    /* function to add new task to firestore */
    const agregar = async (e) => {
        e.preventDefault()
        try {
        await setDoc(doc(db,"Usuarios",form_rut), {
            rut: form_rut,
            nombres: form_nombres,
            apellidopaterno: form_apellidopaterno,
            apellidomaterno: form_apellidomaterno,
            telefono:form_telefono,
            password:form_password,
            created: Timestamp.now()
        })
        } catch (err) {
        alert(err);
        }
    };
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
                <Form onSubmit={agregar}>
                    <Form.Group  className="mb-3 white" controlId="form_rut">
                        <Form.Label>RUT</Form.Label>
                        <Form.Control type="number" placeholder="12345678" onChange={(e) => setform_rut(e.target.value.toUpperCase())} />
                    </Form.Group>
                    <Form.Group className="mb-3 white" controlId="form_nombres" >
                        <Form.Label>Nombres</Form.Label>
                        <Form.Control type="text" placeholder="Marcelo Marcelo" onChange={(e) => setform_nombres(e.target.value.toUpperCase())}/>
                    </Form.Group>
                    <Form.Group className="mb-3 white" controlId="form_apellidopaterno">
                        <Form.Label>Apellido Paterno</Form.Label>
                        <Form.Control type="text" placeholder="Marcelo" onChange={(e) => setform_apellidopaterno(e.target.value.toUpperCase())}/>
                    </Form.Group>
                    <Form.Group className="mb-3 white" controlId="form_apellidomaterno">
                        <Form.Label>Apellido Materno</Form.Label>
                        <Form.Control type="text" placeholder="Marcelo" onChange={(e) => setform_apellidomaterno(e.target.value.toUpperCase())}/>
                    </Form.Group>
                    <Form.Group className="mb-3 white" controlId="form_telefono">
                        <Form.Label>Teléfono</Form.Label>
                        <Form.Control type="number" placeholder="12345678" onChange={(e) => setform_telefono(e.target.value.toUpperCase())}/>
                    </Form.Group>
                    <Form.Group className="mb-3 white" controlId="form_password">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control type="password" placeholder="12345678" onChange={(e) => setform_password(e.target.value.toUpperCase())}/>
                    </Form.Group>
                    <Form.Group className="mb-3 white" controlId="form_password2">
                        <Form.Label>Repetir Contraseña</Form.Label>
                        <Form.Control type="password" placeholder="12345678" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        CREAR
                    </Button>
                </Form>
            </Container>
        </Container>
    );
}

export default Main_CrearCuenta;