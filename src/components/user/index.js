import {React, useState, useEffect} from 'react';
import { auth, db } from './../../firebase';
import { useAuthValue } from './../context/AuthContext';
import { Card, Row, Col, ListGroup, Tab } from 'react-bootstrap';
import MainCrearCuenta from '../main/crearcuenta';
import UserMisReservas from './misreservas';
import UserReservar from './reservar';
import ModalForm from './../admin/Modal'
import MainEditar from '../main/editar';
import {getDocs, collection} from 'firebase/firestore';

function UserIndex() {
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
                                <ListGroup.Item className='listItem' action href="#mishoras">
                                    Mis Horas Agendadas
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
                        <Tab.Pane eventKey="#mishoras">
                            <UserMisReservas type="Horas"/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="#misreservas">
                            <UserMisReservas type="Reservas"/>
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