import { Container, Row, Col, Form, Button, Alert} from 'react-bootstrap';
import { React, useRef, useState } from 'react';
import { useAuthValue } from '../context/AuthContext';
import { auth,db } from './../../firebase';
import {doc, setDoc} from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
function MainCrearCuenta() {
    const emailRef = useRef();
    const rutRef = useRef();
    const nombresRef = useRef();
    const appatRef = useRef();
    const apmatRef = useRef();
    const telefonoRef = useRef();
    const celularRef = useRef();
    const tipocuentaRef = useRef();
    const claveRef = useRef();
    const clave2Ref = useRef();

    const {currentUser} = useAuthValue();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e){
        e.preventDefault();
        if(claveRef.current.value !== clave2Ref.current.value){
           return setError('Claves no coinciden');
        }
        try{
            setError('');
            setLoading(true);
            await createUserWithEmailAndPassword(auth, emailRef.current.value,claveRef.current.value).then(()=>{
                const docRef = doc(db, `Usuarios/${emailRef.current.value}`)
                setDoc(docRef, {
                    correo: emailRef.current.value,
                    rut: rutRef.current.value,
                    nombres: nombresRef.current.value,
                    apellidopaterno: appatRef.current.value,
                    apellidomaterno: apmatRef.current.value,
                    telefono: telefonoRef.current.value,
                    celular: celularRef.current.value,
                    tipo: tipocuentaRef.current.value,
                    password: claveRef.current.value
                });
            });
        }
        catch (err){
            console.log(err);
            setLoading(false);
            return setError('Ocurrió un error al crear cuenta');
        }
        setLoading(false);
    }

    return (
        <Container>
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
            <Container className='d-flex align-items-center justify-content-center'>
                <Form onSubmit={handleSubmit}>
                {error && <Alert variant="danger">{error}</Alert>}
                    <Form.Group className="mb-3 white">
                        <Form.Label>Correo Electrónico</Form.Label>
                        <Form.Control type="email" ref={emailRef} placeholder="correo@gmail.com" />
                    </Form.Group>
                    <Form.Group className="mb-3 white">
                        <Form.Label>RUT</Form.Label>
                        <Form.Control type="text" ref={rutRef} placeholder="12345678-9" />
                    </Form.Group>
                    <Form.Group className="mb-3 white" >
                        <Form.Label>Nombres</Form.Label>
                        <Form.Control type="text" ref={nombresRef} placeholder="Ramon Ramon" />
                    </Form.Group>
                    <Form.Group className="mb-3 white">
                        <Form.Label>Apellido Paterno</Form.Label>
                        <Form.Control type="text" ref={appatRef} placeholder="Araneda" />
                    </Form.Group>
                    <Form.Group className="mb-3 white">
                        <Form.Label>Apellido Materno</Form.Label>
                        <Form.Control type="text" ref={apmatRef} placeholder="Carrasco" />
                    </Form.Group>
                    <Form.Group className="mb-3 white">
                        <Form.Label>Teléfono</Form.Label>
                        <Form.Control type="number" ref={telefonoRef} placeholder="912345678" />
                    </Form.Group>
                    <Form.Group className="mb-3 white">
                        <Form.Label>Celular</Form.Label>
                        <Form.Control type="number" ref={celularRef} placeholder="912345678" />
                    </Form.Group>
                    <Form.Group className="mb-3 white">

                        <Form.Label>Tipo de Cuenta</Form.Label>
                        <Form.Select aria-label="Tipo de Cuenta" ref={tipocuentaRef} >
                            <option>Seleccionar</option>
                            <option value="Usuario">Usuario</option>
                            <option value="Administrador">Administrador</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3 white">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control type="password" ref={claveRef} placeholder="********" />
                    </Form.Group>
                    <Form.Group className="mb-3 white">
                        <Form.Label>Repetir Contraseña</Form.Label>
                        <Form.Control type="password" ref={clave2Ref} placeholder="********" />
                    </Form.Group>
                    <div className="w-100 text-center mt-2">
                        <Button disabled={loading} variant="primary" type="submit">
                            CREAR CUENTA
                        </Button>
                    </div>
                </Form>
            </Container>
        </Container>
    )
}

export default MainCrearCuenta