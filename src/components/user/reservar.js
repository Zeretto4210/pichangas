import React from 'react';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';

function UserReservar(){

  const [startDate, setStartDate] = useState(new Date());

  return (
    <Container fluid="sm">
      <Row className='justify-content-center'>
        <Col className="topContainers">
          <Card>
            <Card.Body>
              <Card.Title>Fecha</Card.Title>
              <DatePicker className="mb-3" selected={startDate} onChange={(date:Date) => {
                setStartDate(date);
                console.log(date)}} />
              <Card.Title>Hora</Card.Title>
                <Form.Group className="mb-3">
                  <Form.Select >
                    <option>00:00</option>
                    <option>22:22</option>
                  </Form.Select>
                </Form.Group>
            </Card.Body>           
          </Card>
        </Col>
      </Row>    
      <Row>
        <Table className='table' striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Valorización</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>El cuartel general</td>
              <td>★★★★☆</td>
              <th>sdfas</th>
              <td>$2.000</td>
              <td>
                <Button>Elegir</Button>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Hanna la última jugada</td>
              <td>★★★★☆</td>
              <th>asd</th>
              <td>$2.000</td>
              <td>
                <Button>Elegir</Button>
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>Horseman o hombre caballo</td>
              <td>★★★★☆</td>
              <th>ffff</th>
              <td>$2.000</td>
              <td>
                <Button>Elegir</Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </Row>
    </Container>      
  );
}
export default UserReservar;