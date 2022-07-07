import { React, useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import ModalForm from './Modal';
import { getDocs, collection, onSnapshot, query, Timestamp } from 'firebase/firestore';
import { ArrowClockwise } from 'react-bootstrap-icons';
import { db } from './../../firebase';
import ModalImage from './../main/picmodal';
function AdminRegistros(props) {
  //Canchas
  var t;
  switch (props.type) {
    case "Canchas": {
      t = "Canchas";
      break;
    }
    case "Horas": {
      t = "Reservas";
      break;
    }
    case "Reservas": {
      t = "Reservas";
      break;
    }
    case "Clientes": {
      t = "Usuarios";
      break;
    }
    case "Perfil": {
      t = "Usuarios";
      break;
    }
  }
  const [canchas, setCanchas] = useState({});
  const [loading, setLoading] = useState(true);
  async function getCanchas() {
    var querySnapshot = null;
    switch (props.type) {
      case "Canchas": {
        querySnapshot = await getDocs(collection(db, "Canchas"));
        break;
      }
      case "Horas": {
        querySnapshot = await getDocs(collection(db, "Reservas"));
        break;
      }
      case "Reservas": {
        querySnapshot = await getDocs(collection(db, "Reservas"));
        break;
      }
      case "Clientes": {
        querySnapshot = await getDocs(collection(db, "Usuarios"));
        break;
      }
      case "Perfil": {
        querySnapshot = await getDocs(collection(db, "Usuarios"));
        break;
      }
    }
    const p = [];
    querySnapshot.forEach((doc) => {
      p.push({ Id: doc.id, ...doc.data() });

    });
    setCanchas(p);
  }

  const q = query(collection(db, t));
  const unsubscribe = onSnapshot(q, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      getCanchas();
    });
  });
  useEffect(() => {
    getCanchas();
    console.log(canchas);

    setLoading(false);
  }, []);
  if (loading) {
    return (<p>Loading</p>);
  }
  else {
    if (props.type == "Canchas") {
      return (
        <>
          <h1 className='white'>Lista de {props.type} <ModalForm do={"Agregar"} type={"Canchas"} /> <Button onClick={getCanchas}> <ArrowClockwise /> </Button></h1>
          <Table responsive striped bordered hover variant='light'>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Capacidad</th>
                <th>Valor</th>
                <th>Imagen</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody>
              {Array.from(canchas).map((a) => (
                <tr>
                  <td>{a.Nombre}</td>
                  <td>{a.Descripcion}</td>
                  <td>{a.Capacidad} personas</td>
                  <td>$ {a.Valor}</td>
                  <td><ModalImage imglink={a.Imagen}/></td>
                  <td>
                    <tr>
                      <td><ModalForm itemId={a.Id} itemData={a} do={"Editar"} type={"Canchas"} /></td>
                      <td><ModalForm itemId={a.Id} itemData={a} do={"Archivar"} type={"Canchas"} /></td>
                    </tr>
                  </td>
                </tr>))}
            </tbody>
          </Table>
        </>
      );
    }
    else if (props.type == "Reservas") {
      return (
        <>
          <h1 className='white'>Lista de {props.type} <ModalForm do={"Agregar"} type={"Reservas"} /> <Button onClick={getCanchas}><ArrowClockwise /></Button></h1>
          <Table responsive striped bordered hover variant='light'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Fecha</th>
                <th>Cancha</th>
                <th>Usuario</th>
                <th>Estado</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody>
              {Array.from(canchas).map((a) => (
                a.Estado == "No Pagado" ? (<tr>
                  <td>{a.Id}</td>
                  <td>{new Date(a.Fecha.seconds*1000).toLocaleDateString('es-CL',{weekday:'long', year:'numeric',month:'long', day:'numeric'})}</td>
                  <td>{a.Cancha}</td>
                  <td>{a.Usuario}</td>
                  <td>{a.Estado}</td>
                  <td>
                    <tr>
                      <td><ModalForm itemId={a.Id} itemData={a} do={"Editar"} type={"Reservas"} /></td>
                      <td><ModalForm itemId={a.Id} itemData={a} do={"Archivar"} type={"Reservas"} /></td>
                    </tr>
                  </td>
                </tr>) : (<></>)
              ))}
            </tbody>
          </Table>
        </>
      );
    }
    else if (props.type == "Horas") {
      return (
        <>
          <h1 className='white'>Lista de {props.type} <ModalForm do={"Agregar"} type={"Horas"} /> <Button onClick={getCanchas}><ArrowClockwise /></Button></h1>
          <Table responsive striped bordered hover variant='light'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Fecha</th>
                <th>Cancha</th>
                <th>Usuario</th>
                <th>Estado</th>
                <th>Codigo de Acceso</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody>
              {Array.from(canchas).map((a) => (
                a.Estado == "Pagado" ? (<tr>
                  <td>{a.Id}</td>
                  <td>{new Date(a.Fecha.seconds*1000).toLocaleDateString('es-CL',{weekday:'long', year:'numeric',month:'long', day:'numeric'})}</td>
                  <td>{a.Cancha}</td>
                  <td>{a.Usuario}</td>
                  <td>{a.Estado}</td>
                  <td>{a.CodigoAcceso}</td>
                  <td>
                    
                      <ModalForm itemId={a.Id} itemData={a} do={"Editar"} type={"Horas"} />
                      <ModalForm itemId={a.Id} itemData={a} do={"Archivar"} type={"Horas"} />
                    
                  </td>
                </tr>) : (<></>)
              ))}
            </tbody>
          </Table>
        </>
      );
    }
    else if (props.type == "Clientes") {  //HERE
      return (
        <>
          <h1 className='white'>Lista de {props.type} <ModalForm do={"Agregar"} type={"Clientes"} /> <Button onClick={getCanchas}><ArrowClockwise /></Button></h1>
          <Table responsive striped bordered hover variant='light'>
            <thead>
              <tr>
                <th>Correo</th>
                <th>RUT</th>
                <th>Nombre Completo</th>
                <th>Telefonos</th>
                <th>Categoria</th>
                <th>Tipo</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody>
              {Array.from(canchas).map((a) => (
                <tr>
                  <td>{a.correo}</td>
                  <td>{a.rut}</td>
                  <td>{a.nombres} {a.apellidopaterno} {a.apellidomaterno}</td>
                  <td>{a.telefono} - {a.celular}</td>
                  <td>{a.categoria}</td>
                  <td>{a.tipo}</td>
                  <td>
                    <ModalForm itemId={a.Id} itemData={a} do={"Editar"} type={"Clientes"} />
                    <ModalForm itemId={a.Id} itemData={a} do={"Archivar"} type={"Clientes"} />
                  </td>
                </tr>))}
            </tbody>
          </Table>
        </>
      );
    }
    else if (props.type == "Perfil") {  //HERE
      return (
        <>
          <h1 className='white'>Lista de {props.type} <ModalForm do={"Agregar"} type={"Perfil"} /> <Button onClick={getCanchas}><ArrowClockwise /></Button></h1>
          <Table responsive striped bordered hover variant='light'>
            <thead>
              <tr>
                <th>Correo</th>
                <th>RUT</th>
                <th>Nombre Completo</th>
                <th>Telefonos</th>
                <th>Categoria</th>
                <th>Tipo</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody>
              {Array.from(canchas).map((a) => (
                <tr>
                  <td>{a.correo}</td>
                  <td>{a.rut}</td>
                  <td>{a.nombres} {a.apellidopaterno} {a.apellidomaterno}</td>
                  <td>{a.telefono} - {a.celular}</td>
                  <td>{a.categoria}</td>
                  <td>{a.tipo}</td>
                  <td>
                    <ModalForm itemId={a.Id} itemData={a} do={"Editar"} type={"Perfil"} />
                    <ModalForm itemId={a.Id} itemData={a} do={"Archivar"} type={"Perfil"} />
                  </td>
                </tr>))}
            </tbody>
          </Table>
        </>
      );
    }
    else {
      return (<p>{props.type} not set</p>);
    }
  }
}

export default AdminRegistros;