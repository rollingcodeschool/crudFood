import { useEffect, useState } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import { obtenerProductoPorID } from "../../helpers/queries";
import { useParams } from "react-router";

const DetalleProducto = () => {
  const [producto, setProducto] = useState({});
  const { id } = useParams();
  useEffect(() => {
    // buscarProducto();
  },[]);

  // const buscarProducto = async () => {
  //   const respuesta = await obtenerProductoPorID(id);
  //   console.log(respuesta);
  //   if (respuesta.status === 200) {
  //     const productoBuscado = await respuesta.json();
  //     setProducto(productoBuscado);
  //   } else {
  //     alert("ocurrio un error intentelo mas tarde");
  //   }
  // };
  return (
    <Container className="my-3 mainSection cabin-sketch-regular">
      <Card>
        <Row>
          <Col md={6}>
            <Card.Img
              variant="top"
              src="https://images.pexels.com/photos/2619970/pexels-photo-2619970.jpeg"
              alt="pizza"
            />
          </Col>
          <Col md={6}>
            <Card.Body>
              <Card.Title className="fs-2">
                {/* {producto.nombreProducto} */}
              </Card.Title>
              <hr />
              <Card.Text className="fs-5">
                {/* {producto.descripcion_amplia} */}
                <br />
                <br />
                <span className="fw-semibold ">Categoria:</span>{" "}
                {/* {producto.categoria} */}
                <br className="mb-3" />
                <span className="fw-semibold ">Precio: $4000</span>
              </Card.Text>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default DetalleProducto;
