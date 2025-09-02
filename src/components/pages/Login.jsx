import { Card, Button, Row, Col, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const Login = ({setUsuarioLogueado}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
 const navegacion =  useNavigate()


  const onSubmit = (data) => {
    console.log(data);
    if (
      data.email === import.meta.env.VITE_API_EMAIL &&
      data.password === import.meta.env.VITE_API_PASSWORD
    ) {
      console.log('aqui logueo al usuario')
      //aqui logueo al usuario
      //1- actualizar el estado
      setUsuarioLogueado(true)
      //2- redireccionar a la pagina del administrador
      Swal.fire({
        title: "Bienvenido Administrador",
        text: "Iniciaste sesion correctamente",
        icon: "success",
      });
      navegacion('/administrador')
    } else {
      Swal.fire({
        title: "Ocurrio un error",
        text: "Credenciales incorrectas",
        icon: "error",
      });
    }
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
                    type="email"
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
                    {...register("password", {
                      required: "La contraseña es un dato obligatorio",
                      pattern: {
                        value:
                          /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/,
                        message:
                          "La contraseña debe tener entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula, al menos una mayúscula y al menos un caracter especial.",
                      },
                    })}
                  />
                  <Form.Text className="text-danger">
                    {errors.password?.message}
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
