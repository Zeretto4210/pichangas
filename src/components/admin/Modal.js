import { React, useEffect, useRef, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useAuthValue } from '../context/AuthContext';
import { db, auth } from './../../firebase';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, createUser } from 'firebase/auth';
import { Pencil, Trash, BagPlus , Bug } from 'react-bootstrap-icons';
function ModalForm(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //refs de cliente
  const emailRef = useRef();
  const rutRef = useRef();
  const nombresRef = useRef();
  const appatRef = useRef();
  const apmatRef = useRef();
  const telefonoRef = useRef();
  const celularRef = useRef();
  const tipocuentaRef = useRef();
  const claveRef = useRef();
  const clave2Ref = useRef();
  //refs de cancha
  const nombreRef = useRef();
  const descripcionRef = useRef();
  const capacidadRef = useRef();
  const valorRef = useRef();
  const imagenRef = useRef();
  //refs de reservas
  const canchaRef = useRef();
  const usuarioRef = useRef();
  const fechaRef = useRef();
  const estadoRef = useRef();

  const { currentUser } = useAuthValue();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (props.do == "Agregar") {
      if (props.type == "Clientes") {
        if (claveRef.current.value !== clave2Ref.current.value) {
          return setError('Claves no coinciden');
        }
        try {
          setError('');
          await createUserWithEmailAndPassword(auth, emailRef.current.value,claveRef.current.value).then(()=>{
            const docRef = doc(db, `Usuarios/${emailRef.current.value}`)
            setDoc(docRef, {
              correo: emailRef.current.value,
              rut: rutRef.current.value,
              nombres: nombresRef.current.value,
              apellidopaterno: appatRef.current.value,
              apellidomaterno: apmatRef.current.value,
              telefono: telefonoRef.current.value,
              celular: celularRef.current.value,
              tipo: tipocuentaRef.current.value,
              password: claveRef.current.value
            });
          });
        }
        catch (err) {
          console.log(err);
          return setError('Ocurrió un error al crear cuenta');
        }
      }
      else if (props.type == "Canchas") {
        try {
          const docRef = await addDoc(collection(db, "Canchas"), {
            Nombre: nombreRef.current.value,
            Descripcion: descripcionRef.current.value,
            Capacidad: capacidadRef.current.value,
            Valor: valorRef.current.value,
            Imagen: imagenRef.current.value
          });
        }
        catch (err) {
          console.log(err);
          return setError('Ocurrió un error al registrar cancha');
        }
      }
      else if (props.type == "Reservas" || props.type == "Horas") {
        try {
          const docRef = await addDoc(collection(db, "Reservas"), {
           Cancha: canchaRef.current.value,
           Usuario: usuarioRef.current.value,
           Fecha: fechaRef.current.value,
           Estado: props.type == "Reservas" ? "No Pagado" : "Pagado",
           CalificacionServicio: 0,
           CalificacionSistema:0,
           CodigoAcceso:""
          });
        }
        catch (err) {
          console.log(err);
          return setError('Ocurrió un error al registrar cancha');
        }
      }
    }
    else if (props.do == "Editar") {
      if (props.type == "Clientes") {
        if (claveRef.current.value !== clave2Ref.current.value) {
          return setError('Claves no coinciden');
        }
        try {
          setError('');
            const docRef = doc(db, `Usuarios/${emailRef.current.value}`)
            setDoc(docRef, {
              correo: emailRef.current.value,
              rut: rutRef.current.value,
              nombres: nombresRef.current.value,
              apellidopaterno: appatRef.current.value,
              apellidomaterno: apmatRef.current.value,
              telefono: telefonoRef.current.value,
              celular: celularRef.current.value,
              tipo: tipocuentaRef.current.value,
              password: claveRef.current.value
            });
          ;
        }
        catch (err) {
          console.log(err);
          return setError('Ocurrió un error al editar cuenta');
        }
      }
      else if (props.type == "Canchas") {
        try {
          const docRef = doc(db, "Canchas", props.itemId);
          setDoc(docRef, {
            Nombre: nombreRef.current.value,
            Descripcion: descripcionRef.current.value,
            Capacidad: capacidadRef.current.value,
            Valor: valorRef.current.value,
            Imagen: imagenRef.current.value
          });
        }
        catch (err) {
          console.log(err);
          return setError('Ocurrió un error al editar cancha');
        }
      }
    }
  }


  return (
    <>
      <Button variant="primary" size="sm" onClick={handleShow}>
        {props.do == "Editar" ? <Pencil /> : (props.do == "Archivar" ? <Trash /> : (props.do == "Agregar" ? <BagPlus /> : <Bug />))}
      </Button>

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>{props.do} {props.type}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {props.type == "Canchas" ? (
              <> <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" ref={nombreRef}  placeholder="Cancha 1" />
              </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Descripcion</Form.Label>
                  <Form.Control type="textarea" ref={descripcionRef} placeholder="Una cancha muy bonita" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Capacidad</Form.Label>
                  <Form.Control type="number" ref={capacidadRef} placeholder="500" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Valor</Form.Label>
                  <Form.Control type="number" ref={valorRef} placeholder="2000" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Imagen</Form.Label>
                  <Form.Control type="text" ref={imagenRef} placeholder="http://www.image.com/image.png" />
                </Form.Group>
              </>
            ) : (
              props.type == "Clientes" ? (
                <> <Form.Group className="mb-3">
                  <Form.Label>Correo Electrónico</Form.Label>
                  <Form.Control type="email" ref={emailRef} placeholder="correo@gmail.com" />
                </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>RUT</Form.Label>
                    <Form.Control type="text" ref={rutRef} placeholder="12345678-9" />
                  </Form.Group>
                  <Form.Group className="mb-3" >
                    <Form.Label>Nombres</Form.Label>
                    <Form.Control type="text" ref={nombresRef} placeholder="Ramon Ramon" />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Apellido Paterno</Form.Label>
                    <Form.Control type="text" ref={appatRef} placeholder="Araneda" />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Apellido Materno</Form.Label>
                    <Form.Control type="text" ref={apmatRef} placeholder="Carrasco" />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Teléfono</Form.Label>
                    <Form.Control type="number" ref={telefonoRef} placeholder="912345678" />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Celular</Form.Label>
                    <Form.Control type="number" ref={celularRef} placeholder="912345678" />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Tipo de Cuenta</Form.Label>
                    <Form.Select aria-label="Tipo de Cuenta" ref={tipocuentaRef} >
                      <option>Seleccionar</option>
                      <option value="Usuario">Usuario</option>
                      <option value="Administrador">Administrador</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="password" ref={claveRef} placeholder="********" />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Repetir Contraseña</Form.Label>
                    <Form.Control type="password" ref={clave2Ref} placeholder="********" />
                  </Form.Group></>
              ) : (
                props.type == "Reservas" || props.type == "Horas"? (
                  <><Form.Group className="mb-3">
                    <Form.Label>Fecha</Form.Label>
                    <Form.Control type="text" ref={fechaRef} placeholder="a" />
                  </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Cancha</Form.Label>
                      <Form.Select aria-label="Tipo de Cuenta" ref={canchaRef} >
                        <option>Seleccionar</option>
                        <option value="Cancha 1">Cancha 1</option>
                        <option value="Cancha 2">Cancha 2</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Usuario</Form.Label>
                      <Form.Select aria-label="Tipo de Cuenta" ref={usuarioRef} >
                        <option>Seleccionar</option>
                        <option value="sus@sus.sus">sus@sus.sus</option>
                        <option value="sas@sas.sas">sas@sas.sas</option>
                      </Form.Select>
                    </Form.Group></>
                ) : (
                  <></>
                )
              )
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cerrar Tabla</Button>
          <Button variant="primary" onClick={handleSubmit}>Guardar</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalForm;