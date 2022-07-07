import { React, useEffect, useRef, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useAuthValue } from '../context/AuthContext';
import { db, auth } from './../../firebase';
import { addDoc, collection, doc, setDoc, Timestamp, getDocs } from 'firebase/firestore';
import { createUserWithEmailAndPassword, createUser } from 'firebase/auth';
import { Pencil, Trash, PlusSquare, Bug } from 'react-bootstrap-icons';
import { DatePicker } from 'react-datepicker';

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
  const catcuentaRef = useRef();
  //refs de cancha
  const nombreRef = useRef();
  const descripcionRef = useRef();
  const capacidadRef = useRef();
  const valorRef = useRef();
  const imagenRef = useRef();
  //refs de reservas
  const canchaRef = useRef();
  const [startDate, setStartDate] = useState(new Date());
  const usuarioRef = useRef();
  const fechaRef = useRef();
  const estadoRef = useRef();

  const [users, setUsers] = useState({});
  const [fields, setFields] = useState({});
  const [categories, setCategories] = useState({});
  const [searching, setSearching] = useState(true);
  const { currentUser } = useAuthValue();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [submit, setSubmit] = useState(0);

  async function getSelects() {
    setSearching(true);
    const queryA = await getDocs(collection(db, "Canchas"));
    const queryB = await getDocs(collection(db, "Usuarios"));
    const queryC = await getDocs(collection(db, "CategoriaCliente"));
    const a = [];
    const b = [];
    const c = [];
    queryA.forEach((doc) => {
      a.push({ Id: doc.id, ...doc.data() });
    });
    queryB.forEach((doc) => {
      b.push({ Id: doc.id, ...doc.data() });
    });
    queryC.forEach((doc) => {
      c.push({ Id: doc.id, ...doc.data() });
    });
    setFields(a);
    setUsers(b);
    setCategories(c);
    setSearching(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmit(1);
    if (props.do == "Agregar") {
      if (props.type == "Clientes" || props.type == "Perfil") {
        if (claveRef.current.value !== clave2Ref.current.value) {
          return setError('Claves no coinciden');
        }
        try {
          setError('');
          await createUserWithEmailAndPassword(auth, emailRef.current.value, claveRef.current.value).then(() => {
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
          setSubmit(2);
          handleClose();
        }
        catch (err) {
          console.log(err);
          setSubmit(3);
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
          setSubmit(2);
          handleClose();
        }
        catch (err) {
          console.log(err);
          setSubmit(3);
          return setError('Ocurrió un error al registrar cancha');
        }
      }
      else if (props.type == "Reservas" || props.type == "Horas") {
        try {
          const docRef = await addDoc(collection(db, "Reservas"), {
            Cancha: canchaRef.current.value,
            Usuario: usuarioRef.current.value,
            Fecha: Timestamp.fromMillis(Date.parse(fechaRef.current.value)),
            Estado: props.type == "Reservas" ? "No Pagado" : "Pagado",
            CalificacionServicio: 0,
            CalificacionSistema: 0,
            CodigoAcceso: ""
          });
          setSubmit(2);

          handleClose();
        }
        catch (err) {
          console.log(err);
          setSubmit(3);
          return setError('Ocurrió un error al registrar el valor');
        }
      }
    }
    else if (props.do == "Editar") {
      if (props.type == "Clientes" || props.type == "Perfil") {
        if (claveRef.current.value !== clave2Ref.current.value) {
          return setError('Claves no coinciden');
        }
        try {
          setError('');
          const docRef = doc(db, `Usuarios/${emailRef.current.value}`)
          await setDoc(docRef, {
            correo: emailRef.current.value,
            rut: rutRef.current.value,
            nombres: nombresRef.current.value,
            apellidopaterno: appatRef.current.value,
            apellidomaterno: apmatRef.current.value,
            telefono: telefonoRef.current.value,
            celular: celularRef.current.value,
            tipo: tipocuentaRef.current.value,
            categoria: catcuentaRef.current.value,
            password: claveRef.current.value
          });

          setSubmit(2);
          handleClose();
        }
        catch (err) {
          console.log(err);
          setSubmit(3);
          return setError('Ocurrió un error al editar cuenta');
        }
      }
      else if (props.type == "Canchas") {
        try {
          const docRef = doc(db, "Canchas", props.itemId);
          await setDoc(docRef, {
            Nombre: nombreRef.current.value,
            Descripcion: descripcionRef.current.value,
            Capacidad: capacidadRef.current.value,
            Valor: valorRef.current.value,
            Imagen: imagenRef.current.value
          });
          setSubmit(2);
          handleClose();
        }
        catch (err) {
          console.log(err);
          setSubmit(3);
          return setError('Ocurrió un error al editar cancha');
        }
      }
      else if (props.type == "Reservas" || props.type == "Horas") {
        try {
          const docRef = doc(db, "Reservas", props.itemId);
          await setDoc(docRef, {
            Cancha: canchaRef.current.value,
            Usuario: usuarioRef.current.value,
            Fecha: Timestamp.fromMillis(Date.parse(fechaRef.current.value)),
            Estado: props.type == "Reservas" ? "No Pagado" : "Pagado",
            CalificacionServicio: 0,
            CalificacionSistema: 0,
            CodigoAcceso: props.type == "Reservas" ? "" : makeid(25)
          });
          setSubmit(2);
          handleClose();
        }
        catch (err) {
          console.log(err);
          setSubmit(3);
          return setError('Ocurrió un error al registrar el valor');
        }
      }
    }
  }

  useEffect(() => {
    getSelects();
  }, []);
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        {props.do == "Editar" ? <Pencil />: (props.do == "Archivar" ? <Trash /> : (props.do == "Agregar" ? <PlusSquare /> : <Bug />))}
      </Button>

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>{props.do} {props.type}</Modal.Title>
        </Modal.Header>
        {searching? (<></>) : (<><Modal.Body>
          {props.do == "Editar" || props.do == "Agregar" ? (<><Form>
            {props.type == "Canchas" ? (
              <> <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" ref={nombreRef} defaultValue={props.do == "Editar" ? props.itemData.Nombre:""} placeholder="Cancha 1" />
              </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Descripcion</Form.Label>
                  <Form.Control type="text" ref={descripcionRef} defaultValue={props.do == "Editar" ? props.itemData.Descripcion:""} placeholder="Una cancha muy bonita" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Capacidad</Form.Label>
                  <Form.Control type="number" ref={capacidadRef} defaultValue={props.do == "Editar" ? props.itemData.Capacidad:""} placeholder="500" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Valor</Form.Label>
                  <Form.Control type="number" ref={valorRef} defaultValue={props.do == "Editar" ? props.itemData.Valor:""} placeholder="2000" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Imagen</Form.Label>
                  <Form.Control type="text" ref={imagenRef} defaultValue={props.do == "Editar" ? props.itemData.Imagen:""} placeholder="http://www.image.com/image.png" />
                </Form.Group>
              </>
            ) : (
              props.type == "Clientes" || props.type == "Perfil" ? (
                <> <Form.Group className="mb-3">
                  <Form.Label>Correo Electrónico</Form.Label>
                  <Form.Control type="email" disabled={props.do == "Editar" ? true:false} defaultValue={props.do == "Editar" ? props.itemId:""} ref={emailRef} placeholder="correo@gmail.com" />
                </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>RUT</Form.Label>
                    <Form.Control type="text" ref={rutRef} defaultValue={props.do == "Editar" ? props.itemData.rut:""} placeholder="12345678-9" />
                  </Form.Group>
                  <Form.Group className="mb-3" >
                    <Form.Label>Nombres</Form.Label>
                    <Form.Control type="text" ref={nombresRef} defaultValue={props.do == "Editar" ? props.itemData.nombres:""} placeholder="Ramon Ramon" />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Apellido Paterno</Form.Label>
                    <Form.Control type="text" ref={appatRef} defaultValue={props.do == "Editar" ? props.itemData.apellidopaterno:""} placeholder="Araneda" />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Apellido Materno</Form.Label>
                    <Form.Control type="text" ref={apmatRef} defaultValue={props.do == "Editar" ? props.itemData.apellidomaterno:""} placeholder="Carrasco" />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Teléfono</Form.Label>
                    <Form.Control type="number" ref={telefonoRef} defaultValue={props.do == "Editar" ? props.itemData.telefono:""} placeholder="912345678" />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Celular</Form.Label>
                    <Form.Control type="number" ref={celularRef} defaultValue={props.do == "Editar" ? props.itemData.celular:""} placeholder="912345678" />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Tipo de Cuenta</Form.Label>
                    <Form.Select aria-label="Tipo de Cuenta" ref={tipocuentaRef} defaultValue={props.do == "Editar" ? props.itemData.tipo:""}  >
                      <option>Seleccionar</option>
                      <option value="Usuario">Usuario</option>
                      <option value="Administrador">Administrador</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Categoria de Cuenta</Form.Label>
                    <Form.Select aria-label="Categoria de Cuenta" ref={catcuentaRef} defaultValue={props.do == "Editar" ? props.itemData.categoria:""}  >
                          {Array.from(categories).map((a) => (
                            <><option value={a.Nombre}>{a.Nombre}</option></>
                          ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="password" ref={claveRef} defaultValue={props.do == "Editar" ? props.itemData.password:""} placeholder="********" />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Repetir Contraseña</Form.Label>
                    <Form.Control type="password" ref={clave2Ref} defaultValue={props.do == "Editar" ? props.itemData.password:""} placeholder="********" />
                  </Form.Group></>
              ) : (
                props.type == "Reservas" || props.type == "Horas" ? (
                  <><Form.Group className="mb-3">
                    <Form.Label>Fecha</Form.Label>
                    <Form.Control type="datetime-local" ref={fechaRef} defaultValue={props.do == "Editar" ? props.itemData.Fecha:""} min="2022-07-07T10:00" max="2025-07-07T24:00" />
                  </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Cancha</Form.Label>
                      <Form.Select aria-label="Tipo de Cuenta" ref={canchaRef} defaultValue={props.do == "Editar" ? props.itemData.Cancha:""} >
                      {Array.from(fields).map((a) => (
                            <><option value={a.Nombre}>{a.Nombre}</option></>
                          ))}
                      </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Usuario</Form.Label>
                      <Form.Select aria-label="Tipo de Cuenta" ref={usuarioRef} defaultValue={props.do == "Editar" ? props.itemData.Usuario:""} >
                      {Array.from(users).map((a) => (
                            <><option value={a.correo}>{a.correo}</option></>
                          ))}
                      </Form.Select>
                    </Form.Group></>
                ) : (
                  <></>
                )
              )
            )}
          </Form></>) : (
          <>
            <Form>
            <Form.Group className="mb-3">
                    <Form.Label>¿Está seguro de eliminar?</Form.Label>
                  </Form.Group>
            </Form>
          </>)

          }
        </Modal.Body></>)}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
          <Button variant="primary" onClick={handleSubmit} disabled={submit == 1 ? true : false}>{props.do}</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalForm;