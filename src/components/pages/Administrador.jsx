import { Table } from "react-bootstrap";
import ItemProducto from "./producto/ItemProducto";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import { listarProductos } from "../../helpers/queries";

const Administrador = ({ borrarProducto }) => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    obtenerProductos();
  }, []);

  const obtenerProductos = async() => {
    //1-solicitar los datos al backend con la funcion de queries
    const respuesta = await listarProductos()
    //2- verificar que los datos llegaron correctamente
    if(respuesta.status === 200){
      const datos = await respuesta.json()
      //3-cargo los productos en el state
      setProductos(datos)
    }
  };

  return (
    <section className="container mainSection">
      <div className="d-flex justify-content-between align-items-center mt-5">
        <h1 className="display-4 ">Productos disponibles</h1>
        <div>
          <Link className="btn btn-primary me-2" to={"/administrador/crear"}>
            <i className="bi bi-file-earmark-plus"></i>
          </Link>
        </div>
      </div>
      <hr />
      <Table responsive striped bordered hover variant="dark">
        <thead>
          <tr className="text-center">
            <th>#</th>
            <th>Producto</th>
            <th>Precio</th>
            <th>URL de Imagen</th>
            <th>Categoria</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((itemProducto, indice) => (
            <ItemProducto
              itemProducto={itemProducto}
              key={itemProducto._id}
              borrarProducto={borrarProducto}
              fila={indice + 1}
            ></ItemProducto>
          ))}
        </tbody>
      </Table>
    </section>
  );
};

export default Administrador;
