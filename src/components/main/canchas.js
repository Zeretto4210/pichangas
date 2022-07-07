import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { doc, collection, onSnapshot, getDocs, query } from "firebase/firestore";
import { db } from './../../firebase';
import { useNavigate } from 'react-router-dom';

function MainListaCanchas() {
    const [canchas, setCanchas] = useState({});
    const [loading, setLoading] = useState(true);
    let navigate = useNavigate();
    function handleReserve(e){
        e.preventDefault();
        navigate("/reservas", { replace: true })
    }
    async function getCanchas() {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, "Canchas"));
        const p = [];
        querySnapshot.forEach((doc) => {
            p.push(doc.data());
            
        });
        setCanchas(p);
        setLoading(false);
    }
    useEffect(() => {
        getCanchas();
    }, []);
    return (
        <Container fluid="md">
            <Row>
                <Col className="text-center mx-auto d-block" md={8}>
                    <h1>Nuestras Canchas</h1>
                </Col>
            </Row>
            <Row>
                <Col className="text-center mx-auto d-block" md={8}>
                    <p>Nuestro complejo deportivo se caracteriza por contar con las mejores canchas para que nuestros queridos Clientes
                        disfruten de un buen partido. Creadas con amor y dedicación para el gusto de los usuarios.
                    </p>
                    <p>A continuación, te mostraremos las canchas que tenemos disponibles para ti.</p>
                </Col>
            </Row>
            {!loading ? (<></>) : (<><Row ><Col className="d-flex justify-content-center"><Spinner animation="border"  variant="primary" /></Col></Row></>)}
            <Row xs={1} md={2} className="g-4">
                {Array.from(canchas).map((a) => (
                    <Col>
                        <Card>
                            <Card.Img variant="top" className="img2" src={a.Imagen} />
                            <Card.Body>
                                <Card.Title>{a.Nombre}</Card.Title>
                                <Card.Text className='black'>
                                    <strong>Capacidad:</strong> {a.Capacidad} personas
                                </Card.Text>
                                <Card.Text className='black'>
                                    <strong>Valor:</strong>  $ {a.Valor}
                                </Card.Text>
                                <Card.Text className='black'>
                                    <strong>Descripción:</strong>  {a.Descripcion}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            {loading ? (<></>) : (<><Row><br/></Row>
            <Row>
                <Col className="text-center mx-auto d-block" md={8}>
                    <Button onClick={handleReserve} variant="success" >Reserva tu Cancha</Button>
                </Col>
            </Row></>)}
            
        </Container>
    );
}
export default MainListaCanchas;