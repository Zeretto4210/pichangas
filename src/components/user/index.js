import React from 'react';
import { auth } from './../../firebase';
import { useAuthValue } from './../context/AuthContext';
import { Card, Row, Col,  ListGroup, Tab } from 'react-bootstrap';
import MainCrearCuenta from '../main/crearcuenta';
import UserMisReservas from './misreservas';
import UserReservar from './reservar';
function UserIndex() {
    const { currentUser } = useAuthValue();
    return (
        <Tab.Container id="list-group-tabs" fluid="md">
            <Row>
                <Col sm={3}>
                    <Card className='card a'>
                        <Card.Body className='body'>
                            <Card.Title className="name">Bienvenido, <strong>{currentUser.nombres}</strong></Card.Title>
                            <ListGroup>
                                <ListGroup.Item className='listItem' action href="#edit">
                                    Editar Perfil
                                </ListGroup.Item>
                                <ListGroup.Item className='listItem' action href="#misagendamientos">
                                    Mis Agendamientos
                                </ListGroup.Item>
                                <ListGroup.Item className='listItem' action href="#misreservas">
                                    Mis Reservas
                                </ListGroup.Item>
                                <ListGroup.Item className='listItem' action href="#buscareserva">
                                    Buscar Reservas
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
                    <Col className='display'>
                        <Tab.Content>
                            <Tab.Pane eventKey="#edit">
                                <MainCrearCuenta />
                            </Tab.Pane>
                            <Tab.Pane eventKey="#misagendamientos">
                                <UserMisReservas />
                            </Tab.Pane>
                            <Tab.Pane eventKey="#misreservas">
                                <UserMisReservas />
                            </Tab.Pane>
                            <Tab.Pane eventKey="#buscareserva">  
                                <UserReservar />
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
            </Row>
        </Tab.Container>
    )
}

export default UserIndex