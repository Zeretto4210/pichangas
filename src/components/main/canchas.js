import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { doc, collection, onSnapshot, getDocs, query } from "firebase/firestore";
import { db } from './../../firebase';

function MainListaCanchas() {
    const [canchas, setCanchas] = useState({});
    async function getCanchas() {
        const querySnapshot = await getDocs(collection(db, "Canchas"));
        const p = [];
        querySnapshot.forEach((doc) => {
            p.push(doc.data());
            
        });
        console.log(p);
        setCanchas(p);
    }
    useEffect(() => {
        getCanchas();
        console.log(canchas);
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
            <Row xs={1} md={2} className="g-4">
                {Array.from(canchas).map((a) => (
                    <Col>
                        <Card>
                            <Card.Img variant="top" className="img2" src={a.Imagen} />
                            <Card.Body>
                                <Card.Title>{a.Nombre}</Card.Title>
                                <Card.Text className='black'>
                                    <strong>Capacidad:</strong> {a.Capacidad}
                                </Card.Text>
                                <Card.Text className='black'>
                                    <strong>Valor:</strong>  {a.Valor}
                                </Card.Text>
                                <Card.Text className='black'>
                                    <strong>Descripción:</strong>  {a.Descripcion}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <Row><br/></Row>
            <Row>
                <Col className="text-center mx-auto d-block" md={8}>
                    <Button href="/" variant="success" >Reserva tu Cancha</Button>
                </Col>
            </Row>
        </Container>
    );
}
export default MainListaCanchas;