import { Button } from "react-bootstrap";
import { Link } from "react-router";
import Swal from "sweetalert2";
import {borrarProductoAPI} from '../../../helpers/queries'

const ItemProducto = ({ itemProducto, borrarProducto, fila }) => {
  
  const eliminarProducto =  () => {
    Swal.fire({
      title: "¿Estas seguro de eliminar?",
      text: "No se puede revertir este paso posteriormente",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#198754",
      cancelButtonColor: "#d33",
      confirmButtonText: "Borrar",
      cancelButtonText: "Cancelar",
    }).then( async(result) => {
      if (result.isConfirmed) {
       const respuesta = await borrarProductoAPI(itemProducto._id)
        if (respuesta.status === 200) {
          Swal.fire({
            title: "Producto eliminado",
            text: `El producto fue eliminado correctamente`,
            icon: "success",
          });
        }else{
           Swal.fire({
            title: "Ocurrio un error",
            text: `El producto no pudo ser eliminado`,
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <tr>
      <td className="text-center">{fila}</td>
      <td>{itemProducto.nombreProducto}</td>
      <td className="text-end">${itemProducto.precio}</td>
      <td className="text-center">
        <img
          src={itemProducto.imagen}
          className="img-thumbnail"
          alt={itemProducto.nombreProducto}
        ></img>
      </td>
      <td>{itemProducto.categoria}</td>
      <td className="text-center">
        <Link className="me-lg-2 btn btn-warning" to={`/administrador/editar/${itemProducto._id}`}>
          <i className="bi bi-pencil-square"></i>
        </Link>
        <Button variant="danger" onClick={eliminarProducto}>
          <i className="bi bi-trash"></i>
        </Button>
      </td>
    </tr>
  );
};

export default ItemProducto;
