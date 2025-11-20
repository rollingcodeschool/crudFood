import { Table, Button } from "react-bootstrap";
import ItemProducto from "./producto/ItemProducto";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import {
  leerProductosPaginadosAPI,
  listarProductos,
} from "../../helpers/queries";

const Administrador = ({ borrarProducto }) => {
  // const [productos, setProductos] = useState([]);
  const [listaProductos, setListaProductos] = useState([]); //almacena los productos de la página actual.
  const [page, setPage] = useState(1); //número de página actual
  const [limit] = useState(10); //cantidad de productos por página (fijo en 10).
  const [totalPages, setTotalPages] = useState(1); //total de páginas disponibles (lo devuelve el backend).

  useEffect(() => {
    obtenerProductosPaginados(page, limit);
  }, [page, limit]);

  // const obtenerProductos = async() => {
  //   //1-solicitar los datos al backend con la funcion de queries
  //   const respuesta = await listarProductos()
  //   //2- verificar que los datos llegaron correctamente
  //   if(respuesta.status === 200){
  //     const datos = await respuesta.json()
  //     //3-cargo los productos en el state
  //     setProductos(datos)
  //   }
  // };
  const obtenerProductosPaginados = async (pagina, limite) => {
    const respuesta = await leerProductosPaginadosAPI(pagina, limite);
    if (respuesta && respuesta.status === 200) {
      const datos = await respuesta.json();
      setListaProductos(datos.productos);
      setTotalPages(datos.cantPaginas || 1);
    } else {
      Swal.fire({
        title: "Ocurrio un error",
        text: `En estos momentos no podemos mostrar los productos, intenta en breve.`,
        icon: "error",
      });
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
          {listaProductos.map((itemProducto, indice) => (
            <ItemProducto
              itemProducto={itemProducto}
              key={itemProducto._id}
              borrarProducto={borrarProducto}
              fila={(page - 1) * limit + indice + 1}
              setListaProductos={setListaProductos}
              page={page}
              limit={limit}
            ></ItemProducto>
          ))}
        </tbody>
      </Table>
      {/* Controles de paginación */}
      <div className="d-flex justify-content-center align-items-center my-3">
        <Button
          variant="secondary"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))} // aseguras de que el nuevo valor se calcule siempre a partir del estado más reciente y correcto
          disabled={page === 1}
        >
          Anterior
        </Button>
        <span className="mx-3">
          Página {page} de {totalPages}
        </span>
        <Button
          variant="secondary"
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          Siguiente
        </Button>
      </div>
    </section>
  );
};

export default Administrador;
