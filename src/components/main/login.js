import { Container, Row, Col, Form, Button, Alert} from 'react-bootstrap';
import { React, useRef, useState } from 'react';
import { useAuthValue } from '../context/AuthContext';
import { auth,db } from './../../firebase';
import {doc, getDoc} from 'firebase/firestore';
import { signInWithEmailAndPassword } from 'firebase/auth';

function MainLogin() {
    const emailRef = useRef();
    const claveRef = useRef();

    const {currentUser} = useAuthValue();

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e){
        e.preventDefault();
        try{
            setError('');
            setLoading(true);
            await signInWithEmailAndPassword(auth, emailRef.current.value,claveRef.current.value)
        }
        catch (err){
            console.log(err);
            setLoading(false);
            return setError('Ocurrió un error al Iniciar Sesión');
        }
        setLoading(false);
    }
    console.log(currentUser);
    return (
        <Container>
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
            <Container className='d-flex align-items-center justify-content-center'>
            <Form onSubmit={handleSubmit}>
                {error && <Alert variant="danger">{error}</Alert>}
                    <Form.Group className="mb-3 white" controlId="form_correo">
                        <Form.Label>Correo Electrónico</Form.Label>
                        <Form.Control type="email" ref={emailRef} placeholder="correo@gmail.com" />
                    </Form.Group>
                    <Form.Group className="mb-3 white" controlId="form_password">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control type="password" ref={claveRef} placeholder="********" />
                    </Form.Group>
                    <div className="w-100 text-center mt-2">
                        <Button variant="primary" type="submit">
                            Iniciar Sesión
                        </Button>
                    </div>
                </Form>
            </Container>
        </Container>
    )
}

export default MainLogin