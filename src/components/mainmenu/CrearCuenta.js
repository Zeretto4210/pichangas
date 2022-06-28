import {React, useState} from 'react';
import './CrearCuenta.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import {auth, db} from './../../firebase';
import {setDoc, doc, Timestamp} from 'firebase/firestore';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import md5 from 'blueimp-md5';

function Main_CrearCuenta(){
    const [form_correo, setform_correo] = useState('');
    const [form_rut, setform_rut] = useState('');
    const [form_nombres, setform_nombres] = useState('');
    const [form_apellidopaterno, setform_apellidopaterno] = useState('');
    const [form_apellidomaterno, setform_apellidomaterno] = useState('');
    const [form_telefono, setform_telefono] = useState('');
    const [form_celular, setform_celular] = useState('');
    const [form_tipo, setform_tipo] = useState('');
    const [form_password, setform_password] = useState('');

    async function registrar(email, rut, nombres, appat, apmat, telefono, celular, tipo, password){
        const info = createUserWithEmailAndPassword(auth, email, password).then((fbuser) =>{

        });
        const docRef = doc(db, `Usuarios/${email} `)
        setDoc(docRef, {correo: form_correo, rut: form_rut, nombres: form_nombres, apellido_paterno: form_apellidopaterno, apellidomaterno: form_apellidomaterno, telefono: form_telefono, celular: form_celular, tipo: form_tipo, password: form_password});
    }

    function handleSubmit(e){
        e.preventDefault();
        registrar(form_correo, form_rut, form_nombres, form_apellidopaterno, form_apellidomaterno, form_telefono, form_celular, form_tipo, form_password);
    }
    /* function to add new task to firestore */
    /*
    const agregar = async (e) => {
        e.preventDefault()
        try {
        await setDoc(doc(db,"Usuarios",form_rut), {
            correo: form_correo,
            rut: form_rut,
            nombres: form_nombres,
            apellidopaterno: form_apellidopaterno,
            apellidomaterno: form_apellidomaterno,
            telefono:form_telefono,
            celular:form_celular,
            tipo:form_tipo,
            password:md5(form_password),
            fechacreacion: Timestamp.now()
        })
        } catch (err) {
        alert(err);
        }
    };*/

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
                <Form onSubmit={handleSubmit}>
                    <Form.Group  className="mb-3 white" controlId="form_correo">
                        <Form.Label>Correo Electrónico</Form.Label>
                        <Form.Control type="email" placeholder="hola@hola.hola" onChange={(e) => setform_correo(e.target.value)} />
                    </Form.Group>
                    <Form.Group  className="mb-3 white" controlId="form_rut">
                        <Form.Label>RUT</Form.Label>
                        <Form.Control type="text" placeholder="12345678-9" onChange={(e) => setform_rut(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3 white" controlId="form_nombres" >
                        <Form.Label>Nombres</Form.Label>
                        <Form.Control type="text" placeholder="Marcelo Marcelo" onChange={(e) => setform_nombres(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3 white" controlId="form_apellidopaterno">
                        <Form.Label>Apellido Paterno</Form.Label>
                        <Form.Control type="text" placeholder="Marcelo" onChange={(e) => setform_apellidopaterno(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3 white" controlId="form_apellidomaterno">
                        <Form.Label>Apellido Materno</Form.Label>
                        <Form.Control type="text" placeholder="Marcelo" onChange={(e) => setform_apellidomaterno(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3 white" controlId="form_telefono">
                        <Form.Label>Teléfono</Form.Label>
                        <Form.Control type="number" placeholder="12345678" onChange={(e) => setform_telefono(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3 white" controlId="form_celular">
                        <Form.Label>Celular</Form.Label>
                        <Form.Control type="number" placeholder="12345678" onChange={(e) => setform_celular(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3 white" controlId="form_tipo">
                        
                        <Form.Label>Tipo de Cuenta</Form.Label>
                        <Form.Select aria-label="Tipo de Cuenta" defaultValue="Usuario" onChange={(e) => setform_tipo(e.target.value)}>
                            <option>Seleccionar</option>
                            <option value="Usuario">Usuario</option>
                            <option value="Administrador">Administrador</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3 white" controlId="form_password">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control type="password" placeholder="12345678" onChange={(e) => setform_password(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3 white" controlId="form_password2">
                        <Form.Label>Repetir Contraseña</Form.Label>
                        <Form.Control type="password" placeholder="12345678" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        CREAR CUENTA
                    </Button>
                </Form>
            </Container>
        </Container>
    );
}

export default Main_CrearCuenta;