import { useState, React } from 'react';
import { Button, Modal, Image, Container, Row } from 'react-bootstrap';
import QRCode from 'react-qr-code';

function ModalQR(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Mostrar QR
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Ticket de Acceso</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            <h1 className="black">{props.Cancha.Nombre}</h1>
                        </Row>
                        <Row>

                            <QRCode value={props.CodigoAcceso} />
                        </Row>
                        <Row>
                            <p className="black">({props.CodigoAcceso})</p>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ModalQR;