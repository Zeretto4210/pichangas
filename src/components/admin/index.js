import React from 'react';
import { auth } from './../../firebase';
import { useAuthValue } from './../context/AuthContext';
import { Card, Row, Col,  ListGroup, Tab } from 'react-bootstrap';
import MainCrearCuenta from '../main/crearcuenta';
import AdminReservas from './Reserva';
import AdminUsuarios from './Usuarios';
import ModalForm from './Modal';
function AdminIndex() {
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
                                <ListGroup.Item className='listItem' action href="#gesreservas">
                                    Gestión de Reservas
                                </ListGroup.Item>
                                <ListGroup.Item className='listItem' action href="#gesclientes">
                                    Gestión de Clientes
                                </ListGroup.Item>
                                <ListGroup.Item className='listItem' action href="#geshoras">
                                    Gestión de Horas
                                </ListGroup.Item>
                                <ListGroup.Item className='listItem' action href="#gescanchas">
                                    Gestión de Canchas
                                </ListGroup.Item>
                                <ListGroup.Item className='listItem' action href="#estadisticas">
                                    Estadísticas
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
                            <Tab.Pane eventKey="#gesreservas">
                                <AdminReservas />
                            </Tab.Pane>
                            <Tab.Pane eventKey="#gesclientes">
                                <AdminReservas />
                            </Tab.Pane>
                            <Tab.Pane eventKey="#geshoras">
                                <AdminReservas />
                            </Tab.Pane>
                            <Tab.Pane eventKey="#gescanchas">
                                <AdminReservas />
                            </Tab.Pane>
                            <Tab.Pane eventKey="#estadisticas">  
                                <MainCrearCuenta />
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
            </Row>
        </Tab.Container>
    )
}

export default AdminIndex