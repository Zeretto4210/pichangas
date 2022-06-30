import React from 'react';
import Table from 'react-bootstrap/Table';
import EditUser from './EditUserModal';

function AdminUsuarios() {


  return (


    <Table striped bordered hover variant='dark'>
      <thead>
        <tr>
          <th>#</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Correo</th>
          <th>Editar Usuario</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Juanito</td>
          <td>Alcachofa</td>
          <td>juan@123</td>
          <td>
              <EditUser/>
          </td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
          <td>
              <EditUser/>
          </td>
        </tr>
        <tr>
          <td>3</td>
          <td colSpan={2}>Larry the Bird</td>
          <td>@twitter</td>
          <td>
              <EditUser/>
          </td>
        </tr>
        <tr>
          <td>1</td>
          <td>Juanito</td>
          <td>Alcachofa</td>
          <td>juan@123</td>
          <td>
              <EditUser/>
          </td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
          <td>
              <EditUser/>
          </td>
        </tr>
        <tr>
          <td>3</td>
          <td colSpan={2}>Larry the Bird</td>
          <td>@twitter</td>
          <td>
              <EditUser/>
          </td>
        </tr>
      </tbody>
    </Table>
  );
}
  
  export default AdminUsuarios;