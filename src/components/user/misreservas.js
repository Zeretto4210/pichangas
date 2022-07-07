import { React, useState, useEffect } from 'react';
import { Container, Row, Col, Tab, Tabs, Button, Stack, Spinner, Image } from 'react-bootstrap';
import { db } from './../../firebase';
import { getDocs, collection } from 'firebase/firestore';
import { ArrowClockwise } from 'react-bootstrap-icons';

import { useAuthValue } from './../context/AuthContext';
function UserMisReservas(props) {
  const [loading, setLoading] = useState(true);
  const [reservas, setReservas] = useState({});
  const [canchas, setCanchas] = useState({});
  const { currentUser } = useAuthValue();

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
    <>
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
                      <Row><Button className='buttonPagar'>Ir a pagar</Button></Row>
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
                      <Row><Button className='buttonPagar'>Nostrar QR</Button></Row>
                    </Col>
                  </Row>
                </Container>
              </Tab>
              
              :<Tab></Tab>
              ))}
            </Tabs></>}
        </Row>
      </Container>
    </>
  );
}
export default UserMisReservas;