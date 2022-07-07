import React from 'react';
import { auth } from './../../firebase';
import { useAuthValue } from './../context/AuthContext';
import { Card, Row, Col, ListGroup, Tab } from 'react-bootstrap';
import ModalForm from './Modal';
import AdminRegistros from './registros';
import MainEnConstruccion from '../main/enconstruccion';
function AdminIndex() {
    const { currentUser } = useAuthValue();
    return (
        <Tab.Container id="list-group-tabs" fluid="md">
            <Row>
                <Col sm={3}>
                    <Card className='card a'>
                        <Card.Body className='body'>
                            <Card.Title className="name">Bienvenido, <strong>{currentUser.nombres} </strong>
                                <ModalForm itemId={currentUser.correo} itemData={currentUser} do={"Editar"} type={"Perfil"} />
                            </Card.Title>                                   
                            <ListGroup>
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
                            
                        </Tab.Pane>
                        <Tab.Pane eventKey="#gesreservas">

                            <AdminRegistros type={"Reservas"} />
                        </Tab.Pane>
                        <Tab.Pane eventKey="#gesclientes">

                            <AdminRegistros type={"Clientes"} />
                        </Tab.Pane>
                        <Tab.Pane eventKey="#geshoras">
                            <AdminRegistros type={"Horas"} />
                        </Tab.Pane>
                        <Tab.Pane eventKey="#gescanchas">
                            <AdminRegistros type={"Canchas"} />
                        </Tab.Pane>
                        <Tab.Pane eventKey="#estadisticas">
                            <MainEnConstruccion />
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    )
}

export default AdminIndex
