import {React, useState, useEffect} from 'react';
import {Table} from 'react-bootstrap';
import ModalForm from './Modal';
import {getDocs, collection} from 'firebase/firestore';
import {db} from './../../firebase';
function AdminRegistros(props) {
    //Canchas
    const [canchas, setCanchas] = useState({});
    const [loading, setLoading] = useState(true);
    async function getCanchas() {
        const querySnapshot = await getDocs(collection(db, "Canchas"));
        const p = [];
        querySnapshot.forEach((doc) => {
            p.push({Id:doc.id,...doc.data()});
            
        });
        console.log(p);
        setCanchas(p);
        setLoading(false);
    }
    useEffect(() => {
        getCanchas();
        console.log(canchas);
    }, []);
  return (
    <>
    <h1 className='white'>Lista de {props.type} <ModalForm do={"Agregar"} type={"Canchas"}/></h1>
    <Table resposive striped bordered hover variant='light'>
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
          <td><img className="img-fluid" src={a.Imagen} /></td>
          <td>
            <tr>
                <td><ModalForm itemId={a.Id} itemData={a} do={"Editar"} type={"Canchas"}/></td>
                <td><ModalForm itemId={a.Id} itemData={a} do={"Archivar"} type={"Canchas"}/></td>
            </tr>
          </td>
        </tr>))};
      </tbody>
    </Table>
    </>
  );
}
  
  export default AdminRegistros;