import {React, useEffect, useState} from 'react';
import './IniciarSesion.css';

import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/esm/Form'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/esm/Button';

import {auth, db} from './../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

import md5 from 'blueimp-md5';


function Main_IniciarSesion(){
    const [userInput, setUserInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [roleInput, setRoleInput] = useState('');
    useEffect(()=>{
    },[])

    function handleSubmit(e){
        e.preventDefault();
        const mail = e.target.elements.form_rut.value;
        const password = e.target.elements.form_password.value;
        const role = e.target.elements.form_tipo.value;
        signInWithEmailAndPassword(auth,mail, password);
        console.log(mail,password,role);
    }

    return (
        <Container fluid="md">
            <Row>
                <Col className="text-center mx-auto d-block" md={8}>
                    <h1>Iniciar Sesión</h1>
                </Col>
            </Row>
            <Row>
                <Col className="text-center mx-auto d-block" md={8}>
                    <p>Ingresa tus datos para iniciar sesión.</p>
                </Col>
            </Row>
            <Container>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3 white" controlId="form_rut">
                        <Form.Label>Correo</Form.Label>
                        <Form.Control type="email" placeholder="12345678-9" onChange={(e) => setUserInput(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3 white" controlId="form_password">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control type="password" placeholder="********" onChange={(e) => setPasswordInput(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3 white" controlId="form_tipo">
                        <Form.Label>Tipo de Cuenta</Form.Label>
                        <Form.Select aria-label="Tipo de Cuenta" onChange={(e) => setRoleInput(e.target.value)}>
                            <option>Seleccionar</option>
                            <option value="Usuario">Usuario</option>
                            <option value="Administrador">Administrador</option>
                        </Form.Select>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Iniciar Sesión
                    </Button>
                </Form>
            </Container>
        </Container>
    );
}

export default Main_IniciarSesion;