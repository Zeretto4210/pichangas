import { React, useState } from 'react';
import { Container, Row, Col, Button, Card, Modal, Spinner } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Search } from 'react-bootstrap-icons';
import { getDocs, collection, addDoc, Timestamp } from 'firebase/firestore'
import { db } from './../../firebase'
import { useAuthValue } from './../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function UserReservar() {
  const a = new Date();
  a.setMinutes(0);
  a.setSeconds(0);
  a.setMilliseconds(0);
  a.setHours(11);
  const [startDate, setStartDate] = useState(a);
  const [canchasDisp, setCanchasDisp] = useState({});
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [registering, setRegistering] = useState(false);
  const [show, setShow] = useState(false);
  const [tipo, setTipo] = useState(3);
  const [canID, setCanID] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let navigate = useNavigate();
  const { currentUser } = useAuthValue();
  function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    return result;
  }

  function handleButtons(n, id) {
    if (!currentUser) {
      navigate("/login", { replace: true });
    }
    else {
      setTipo(n);
      setCanID(id);
      handleShow();
    }

  }
  async function handleRegister(e) {
    e.preventDefault();
    setRegistering(true);
    try {
      const docRef = await addDoc(collection(db, "Reservas"), {
        Cancha: canID,
        Usuario: currentUser.correo,
        Fecha: Timestamp.fromMillis(startDate.getTime()),
        Estado: tipo == 1 ? "No Pagado" : "Pagado",
        CalificacionServicio: 0,
        CalificacionSistema: 0,
        CodigoAcceso: tipo == 1 ? "" : makeid(25)
      });
      handleClose();
      setRegistering(false);
      handleSearch(e);
    }
    catch (err) {
      console.log(err);
      setRegistering(false);
    }
  }
  async function handleSearch(e) {
    e.preventDefault();
    setLoading(true);
    setSearching(true);
    const queryA = await getDocs(collection(db, "Canchas"));
    const queryB = await getDocs(collection(db, "Reservas"));
    const a = [];
    const b = [];
    const c = a.map((x) => x);
    queryA.forEach((doc) => {
      a.push({ Id: doc.id, ...doc.data() });
    });
    queryB.forEach((doc) => {
      b.push({ Id: doc.id, ...doc.data() });
    });
    b.forEach((i) => {
      const date = new Date(i.Fecha.seconds * 1000);
      if (date.getTime() == startDate.getTime()) {
        a.forEach((j) => {
          if (j.Nombre == i.Cancha) {
            const index = a.indexOf(j);
            if (index > -1) {
              a.splice(index, 1);
            }
          }
        })
      }
    })
    setCanchasDisp(a);
    setLoading(false);
    setSearching(false);
  }

  return (
    <><Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{tipo == 1 ? "RESERVAR" : "AGENDAR"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="black">Pulse el botón de {tipo == 1 ? "RESERVAR" : "AGENDAR"} para ejecutar el proceso.</p>
        <p className="black">(Inserte aquí módulo de WebPay)</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          NO {tipo == 1 ? "RESERVAR" : "AGENDAR"}
        </Button>
        <Button variant="primary" onClick={handleRegister}>
          {tipo == 1 ? "RESERVAR" : "AGENDAR"}
        </Button>
      </Modal.Footer>
    </Modal>
      <Container fluid="md">
        <Row className='justify-content-center text-center'>
          <h1>Buscar una Reserva</h1>
        </Row>
        <Row className='justify-content-center text-center'>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Seleccionar Fecha</Card.Title>
                <DatePicker showTimeSelect timeIntervals={60} dateFormat="dd/MM/yyyy h:mm aa" minTime={new Date().setHours(10)} maxTime={new Date().setHours(23)} timeCaption="Hora" minDate={startDate} selected={startDate} onChange={(date) => {
                  setStartDate(date);
                }} />
                <Card.Title></Card.Title>
                <Button onClick={handleSearch} disabled={searching}> {searching ? (<><Spinner animation="border" variant="white" /> <p>Buscando</p></>) : (<><Search /><p>Buscar</p></>)}</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="text-center">
          <br />
        </Row>
        <Row xs={1} md={2} className="g-4 justify-content-center">
          {loading ? (<></>) : (
            Array.from(canchasDisp).length == 0 ? (
              <Card style={{ width: '18rem' }}>
                <Card.Body>
                  <Card.Title>NO HAY CANCHAS DISPONIBLES</Card.Title>
                  <Card.Text className='black'>Lamentamos informar que para esa fecha seleccionada, todas nuestras canchas están reservadas. </Card.Text>
                </Card.Body>
              </Card>) : (
              Array.from(canchasDisp).map((a) => (
                <Card style={{ width: '18rem' }}>
                  <Card.Img variant="top" src={a.Imagen} className="img4" />
                  <Card.Body>
                    <Card.Title>{a.Nombre}</Card.Title>
                    <Card.Text className='black'>{a.Descripcion} </Card.Text>
                    <Card.Text className='black'>Capacidad: {a.Capacidad} personas</Card.Text>
                    <Card.Text className='black'>Precio: $ {a.Valor}</Card.Text>
                    <Row className="justify-content-center">
                      <Col><Button variant="primary" onClick={() => handleButtons(1, a.Nombre)}>Reservar</Button></Col>
                      <Col><Button variant="primary" onClick={() => handleButtons(2, a.Nombre)}>Agendar</Button></Col>
                    </Row>
                  </Card.Body>
                </Card>
              )
              ))
          )}
        </Row>
      </Container></>
  );
}
export default UserReservar;