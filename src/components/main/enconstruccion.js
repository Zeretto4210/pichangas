import React from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap'
function MainEnConstruccion() {
  return (
    <Container fluid>
      <Row className="">
        <Col><h1>Módulo en Construcción</h1></Col>
      </Row>
      <Row>
        <Col>
          <p className="col-md-8 fs-4 white">Lamentamos informar que este módulo aún sigue en construcción, esperamos tener esta funcionalidad implementada en una futura revisión del proyecto.</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <Image src={require('./../../files/working.gif')} />
        </Col>
      </Row>
    </Container>
  )
}

export default MainEnConstruccion