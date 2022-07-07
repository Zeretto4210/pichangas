import { React, useState, useEffect } from 'react';
import { Container, Row, Col, Tab, Tabs, Button, Modal, Spinner, Image } from 'react-bootstrap';
import { db } from './../../firebase';
import { getDocs, collection, setDoc, doc, updateDoc } from 'firebase/firestore';
import { ArrowClockwise } from 'react-bootstrap-icons';
import { useAuthValue } from './../context/AuthContext';
import ModalQR from './qrmodal';
function UserMisReservas(props) {
  const [loading, setLoading] = useState(true);
  const [reservas, setReservas] = useState({});
  const [selectedID, setSelectedID] = useState("");
  const { currentUser } = useAuthValue();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleThisThing(e){
    console.log(e);
    setSelectedID(e);
    handleShow();
  }
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
  async function handleRegister(e) {
    e.preventDefault();
    try {
      const docRef = doc(db, "Reservas", selectedID);
      await updateDoc(docRef, {
        Estado: "Pagado",
        CodigoAcceso: makeid(25)
      });
      handleClose();
      handleSearch();
    }
    catch (err) {
      console.log(err);
    }
  }

  async function handleSearch() {
    setLoading(true);
    const queryA = await getDocs(collection(db, "Reservas"));
    const queryB = await getDocs(collection(db, "Canchas"));
    const a = [];
    const b = [];
    const c = [];
    const d = [];
    queryA.forEach((doc) => {
      a.push({ Id: doc.id, ...doc.data() });
    });
    queryB.forEach((doc) => {
      b.push({ Id: doc.id, ...doc.data() });
    });
    a.forEach((i) => {
      if (i.Usuario == currentUser.correo) {
        d.splice(0, d.length);
        b.forEach((j) => {
          if (j.Nombre == i.Cancha) {
            d.push({ canchaData: j, ...i });
            c.push(d[0]);
          }
        })
      }
    })
    setReservas(c);
    setLoading(false);
  }
  useEffect(() => {
    handleSearch();
  }, []);
  return (
    <><Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>PAGAR RESERVA</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="black">Pulse el botón de PAGAR RESERVA para ejecutar el proceso.</p>
        <p className="black">(Inserte aquí módulo de WebPay)</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          NO PAGAR RESERVA
        </Button>
        <Button variant="primary" onClick={handleRegister}>
        PAGAR RESERVA
        </Button>
      </Modal.Footer>
    </Modal>
      <Container fluid="md">
        <Row><h1>Lista de {props.type} <Button onClick={handleSearch}><ArrowClockwise /></Button></h1></Row>
        <Row>
          {loading ? <><Row ><Col className="d-flex justify-content-center"><Spinner animation="border" variant="primary" /></Col></Row></> : <>
            <Tabs className="tabs" fill>
              {Array.from(reservas).map((a) => (
                a.Estado == "No Pagado" && props.type == "Reservas" ?

                  <Tab eventKey={a.Id} title={new Date(a.Fecha.seconds * 1000).toLocaleDateString('es-CL', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) + ", " + new Date(a.Fecha.seconds * 1000).toLocaleTimeString('es-CL')}>
                    <Container>
                      <Row className='containerInfo'>
                        <Col className='containerBox'>
                          <h1 className="black"><b>Cancha Utilizada</b></h1>
                          <Image thumbnail={true} src={a.canchaData.Imagen} />
                          <h3 className="black">{a.Cancha}</h3>
                        </Col>
                        <Col className='containerBox'>
                          <Row><p className="black">ID: #{a.Id}</p></Row>
                          <Row><p className="black">Fecha: {new Date(a.Fecha.seconds * 1000).toLocaleDateString('es-CL', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) + ", " + new Date(a.Fecha.seconds * 1000).toLocaleTimeString('es-CL')}</p></Row>
                          <Row><p className="black">Valor: ${a.canchaData.Valor}</p></Row>
                          <Row><p className="black">Estado: {a.Estado}</p><br /></Row>
                          <Row><Button onClick={() => handleThisThing(a.Id)} className='buttonPagar'>Ir a pagar</Button></Row>
                        </Col>
                      </Row>
                    </Container>
                  </Tab>
                  : a.Estado == "Pagado" && props.type == "Horas" ?

                    <Tab eventKey={a.Id} title={new Date(a.Fecha.seconds * 1000).toLocaleDateString('es-CL', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) + ", " + new Date(a.Fecha.seconds * 1000).toLocaleTimeString('es-CL')}>
                      <Container>
                        <Row className='containerInfo'>
                          <Col className='containerBox'>
                            <h1 className="black"><b>Cancha Utilizada</b></h1>
                            <Image thumbnail={true} src={a.canchaData.Imagen} />
                            <h3 className="black">{a.Cancha}</h3>
                          </Col>
                          <Col className='containerBox'>
                            <Row><p className="black">ID: #{a.Id}</p></Row>
                            <Row><p className="black">Fecha: {new Date(a.Fecha.seconds * 1000).toLocaleDateString('es-CL', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) + ", " + new Date(a.Fecha.seconds * 1000).toLocaleTimeString('es-CL')}</p></Row>
                            <Row><p className="black">Valor: ${a.canchaData.Valor}</p></Row>
                            <Row><p className="black">Estado: {a.Estado}</p><br /></Row>
                            <Row><ModalQR CodigoAcceso={a.CodigoAcceso} Cancha={a.canchaData} /></Row>
                          </Col>
                        </Row>
                      </Container>
                    </Tab>

                    : <Tab></Tab>
              ))}
            </Tabs></>}
        </Row>
      </Container>
    </>
  );
}
export default UserMisReservas;