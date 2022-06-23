import React from 'react';
import './ListaCanchas.css';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
function Main_ListaCanchas(){
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
                {Array.from({ length: 4 }).map((_, idx) => (
                    <Col>
                        <Card>
                            <Card.Img variant="top" src="https://dummyimage.com/800X480/000000/FFFFFF" />
                            <Card.Body>
                            <Card.Title>Cancha N° X ★★★★☆</Card.Title>
                            <Card.Text className='black'>
                                Cancha con tantos requisitos, etc.
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
export default Main_ListaCanchas;