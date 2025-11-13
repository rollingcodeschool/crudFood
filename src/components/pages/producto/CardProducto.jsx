import { Col, Card } from "react-bootstrap";
import { Link } from "react-router";

const CardProducto = ({itemProducto}) => {
  return (
    <Col md={4} lg={3} className="mb-3">
      <Card className="h-100">
        <div>
          <img
            src="https://images.pexels.com/photos/2619970/pexels-photo-2619970.jpeg"
            alt='pizza'
            className="card-img-top-nueva"
          />
        </div>
        <Card.Body>
          <Card.Title>{itemProducto.nombreProducto}</Card.Title>
          <Card.Text>
            {itemProducto.descripcion_breve}
            <br className="mb-2" />
            <span className="fw-bold">Precio: ${itemProducto.precio}</span>
          </Card.Text>
        </Card.Body>
        <Card.Footer className="text-end">
          <Link className="me-2 btn btn-success" to={`/detalle/${itemProducto._id}` }>
            Ver más
          </Link>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default CardProducto;
