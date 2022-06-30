import React from 'react';
import Table from 'react-bootstrap/Table';
import EditReserva from './EditReservaModal';
import ModalForm from './Modal';
function AdminReservas() {


  return (


    <Table striped bordered hover variant='light'>
      <thead>
        <tr>
          <th>#</th>
          <th>Fecha</th>
          <th>Cancha</th>
          <th>Hora</th>
          <th>Editar Reserva</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>15-07-2022</td>
          <td>Cerro la cruz</td>
          <td>17:30 PM</td>
          <td>
            <EditReserva/>
          </td>
        </tr>
        <tr>
          <td>2</td>
          <td>16-07-2022</td>
          <td>Las Machas</td>
          <td>18:00 PM</td>
          <td>
            <EditReserva/>
          </td>
        </tr>
        <tr>
          <td>3</td>
          <td>20-07-2022</td>
          <td>Cerro la cruz</td>
          <td>19:30 PM</td>
          <td>
            <EditReserva/>
          </td>
        </tr>
        <tr>
          <td>1</td>
          <td>Juanito</td>
          <td>Alcachofa</td>
          <td>juan@123</td>
          <td>
            <EditReserva/>
          </td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
          <td>
            <EditReserva/>
          </td>
        </tr>
        <tr>
          <td>3</td>
          <td colSpan={2}>Larry the Bird</td>
          <td>@twitter</td>
          <td>
            <ModalForm do={"Editar"} type={"Canchas"}/>
            <ModalForm do={"Archivar"} type={"Canchas"}/>
            <ModalForm do={"Agregar"} type={"Canchas"}/>
            <ModalForm do={"Editar"} type={"Clientes"}/>
            <ModalForm do={"Archivar"} type={"Clientes"}/>
            <ModalForm do={"Agregar"} type={"Clientes"}/>
          </td>
        </tr>
      </tbody>
    </Table>
  );
}
  
  export default AdminReservas;