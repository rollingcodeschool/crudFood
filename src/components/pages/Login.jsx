import { Card, Button, Row, Col, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    //   agregar logica de login
  };

  return (
    <>
      <Card className=" shadow p-3 mb-5 bg-body rounded card-login">
        <Row xs={1} md={2}>
          <Col>
            <Card.Body>
              <h1 className="text-center mb-4">Iniciar sesion</h1>
              {/* <h3>Ingresa los datos de tu</h3> */}
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ej: juanperez@mail.com"
                    {...register("email", {
                      required: "El email es un dato obligatorio",
                      pattern: {
                        value:
                          /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
                        message:
                          "El email debe ser un correo valido por ej: juanperez@mail.com",
                      },
                    })}
                  />
                  <Form.Text className="text-danger">
                    {errors.email?.message}
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Contraseña:</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Ingresa una contraseña"
                  />
                  <Form.Text className="text-danger">
                    
                  </Form.Text>
                </Form.Group>
                <Button variant="warning" type="submit">
                  Iniciar sesión
                </Button>
              </Form>
            </Card.Body>
          </Col>
          <Col>
            <img
              src="https://images.pexels.com/photos/905847/pexels-photo-905847.jpeg"
              alt="Imagen comida"
              className="img-login rounded-3"
            />
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default Login;
