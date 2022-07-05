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
import { Search } from 'react-bootstrap-icons';

function UserReservar() {

  const [startDate, setStartDate] = useState(new Date());
  const [canchasDisp, setCanchasDisp] = useState({});
  const [loading, setLoading] = useState(true);

  async function handleSearch(e){
    e.preventDefault();
    const queryA = await getDocs(collection(db, "Canchas"));
    const queryB = await getDocs(collection(db, "Reservas"));
    const a = [];
    const b = [];
    queryB.forEach((doc) => {
      p.push({ Id: doc.id, ...doc.data() });

    });
  }

  return (
    <Container fluid="md">
      <Row className='justify-content-center'>
        <Col className="topContainer2">
          <Card>
            <Card.Body>
              <Card.Title>Seleccionar Fecha</Card.Title>
              <DatePicker showTimeSelect timeIntervals={60} dateFormat="dd/MM/yyyy h:mm aa" minTime={new Date().setHours(10)} maxTime={new Date().setHours(20)} timeCaption="Hora" minDate={new Date().setMinutes(0)} selected={startDate} onChange={(date: Date) => {
                setStartDate(date);
                console.log(date)
              }} />
              <Button onClick={handleSearch}><Search /> Buscar</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        {loading ? (<></>) : (
          Array.from(canchasDisp).length == 0 ? (<p>NO HAY CANCHAS DISPONIBLES</p>) : (Array.from(canchasDisp).map((a) => (
            <tr>
              <td>{a.Nombre}</td>
              <td>{a.Descripcion}</td>
              <td>{a.Capacidad} personas</td>
              <td>$ {a.Valor}</td>
              <td><img className="img-fluid" src={a.Imagen} /></td>
              <td><Button /></td>
            </tr>
          )))
        )}
      </Row>
    </Container>
  );
}
export default UserReservar;