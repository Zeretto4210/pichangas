import {useState, React} from 'react';
import {Button, Modal, Image} from 'react-bootstrap';

function ModalImage(props) {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Ver Imagen
        </Button>
  
        <Modal  show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Imagen de Cancha</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Image fluid={true} src={props.imglink} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cerrar
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  export default ModalImage;