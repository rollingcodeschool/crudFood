import { Container, Form, Row } from "react-bootstrap";
import CardProducto from "./producto/CardProducto";
import { useEffect, useState } from "react";
import { listarProductos } from "../../helpers/queries";

const Inicio = () => {
  const [productos, setProductos] = useState([]);
  useEffect(() => {
    obtenerProductos();
  }, []);

  const obtenerProductos = async () => {
    //1-solicitar los datos al backend con la funcion de queries
    const respuesta = await listarProductos();
    //2- verificar que los datos llegaron correctamente
    if (respuesta.status === 200) {
      const datos = await respuesta.json();
      //3-cargo los productos en el state
      setProductos(datos);
    }
  };
  return (
    <section>
      <img
        className="banner shadow-lg rounded-3"
        src="https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg"
        alt="fondo cafe"
      />
      <Container className="mt-5 cabin-sketch-regular">
        <h1 className="display-4 cabin-sketch-bold">Nuestros Productos</h1>
        <hr />
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Buscar un producto</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa el nombre del producto"
            />
          </Form.Group>
        </Form>
        <Row>
          {productos.map((itemProducto) => (
            <CardProducto
              itemProducto={itemProducto}
              key={itemProducto._id}
            ></CardProducto>
          ))}

          {/* <p>No hay productos disponibles</p> */}
        </Row>
      </Container>
    </section>
  );
};

export default Inicio;
