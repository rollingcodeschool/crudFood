import { Button } from "react-bootstrap";
import { Link } from "react-router";
import Swal from "sweetalert2";

const ItemProducto = ({itemProducto}) => {
  const eliminarProducto = () => {
    Swal.fire({
      title: "¿Estas seguro de eliminar?",
      text: "No se puede revertir este paso posteriormente",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#198754",
      cancelButtonColor: "#d33",
      confirmButtonText: "Borrar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Producto eliminado",
          text: `El producto eliminado correctamente`,
          icon: "success",
        });
      }
    });
  };

  return (
    <tr>
      <td className="text-center">1</td>
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
        <Link
          className="me-lg-2 btn btn-warning"
          to={`/administrador/editar`}
        >
          <i className="bi bi-pencil-square"></i>
        </Link>
        <Button variant="danger" >
          <i className="bi bi-trash"></i>
        </Button>
      </td>
    </tr>
  );
};

export default ItemProducto;
