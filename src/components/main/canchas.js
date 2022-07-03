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
                    <p>Ut aperiam recusandae ea quia optio et adipisci laborum ut galisum alias. Aut rerum laborum et reprehenderit amet ut
                        cumque exercitationem. Vel tempore voluptate qui esse et neque doloribus eum magni rerum nam voluptatem quas.
                    </p>
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
            <Row>
                <Col className="text-center mx-auto d-block" md={8}>
                    <Button href="/" variant="success" >Reserva tu Cancha</Button>
                </Col>
            </Row>
        </Container>
    );
}
export default MainListaCanchas;