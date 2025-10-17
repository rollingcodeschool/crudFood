import { useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";
import { obtenerProductoPorID } from "../../../helpers/queries";

const FormularioProducto = ({
  titulo,
  crearProducto,
  modificarProducto,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const { id } = useParams();
  const navegacion = useNavigate();

  useEffect(() => {
    buscarProducto();
  });

  const buscarProducto = async () => {
    if (titulo === "Editar Producto") {
      console.log(id);
      const respuesta = await obtenerProductoPorID(id);
      if (respuesta.status === 200) {
        const productoBuscado = await respuesta.json();
        console.log(productoBuscado);
        setValue("nombreProducto", productoBuscado.nombreProducto);
        setValue("precio", productoBuscado.precio);
        setValue("imagen", productoBuscado.imagen);
        setValue("descripcion_breve", productoBuscado.descripcion_breve);
        setValue("descripcion_amplia", productoBuscado.descripcion_amplia);
        setValue("categoria", productoBuscado.categoria);
      }else{
        alert('ocurrio un error intentelo mas tarde')
      }
    }
  };

  const onSubmit = (data) => {
    if (titulo === "Crear Producto") {
      //agregar id
      data.id = uuidv4();
      console.log(data);
      if (crearProducto(data)) {
        Swal.fire({
          title: "Producto creado",
          text: `El producto ${data.nombreProducto} se creo correctamente`,
          icon: "success",
        });
        reset();
      }
    } else {
      //aqui tengo que agregar el editar
      if (modificarProducto(id, data)) {
        //mostrar un cartel de producto modificado
        Swal.fire({
          title: "Producto modificado",
          text: `El producto ${data.nombreProducto} se actualizo correctamente`,
          icon: "success",
        });
        //redireccionar a la tabla del administrador
        navegacion("/administrador");
      } else {
        //sin no se modifico mostrar un mensaje de error
        Swal.fire({
          title: "Ocurrio un error",
          text: `No se pudo actualizar el producto ${data.nombreProducto}`,
          icon: "error",
        });
      }
    }
  };

  return (
    <section className="container mainSection">
      <h1 className="display-4 mt-5">{titulo}</h1>
      <hr />
      <Form className="my-4" onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formNombreProdcuto">
          <Form.Label>Producto*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: Pizza"
            {...register("nombreProducto", {
              required: "El nombre del producto es un dato obligatorio",
              minLength: {
                value: 2,
                message:
                  "El nombre del producto debe tener almenos 2 caracteres",
              },
              maxLength: {
                value: 100,
                message:
                  "El nombre del producto debe tener como maximo 100 caracteres",
              },
            })}
          />
          <Form.Text className="text-danger">
            {errors.nombreProducto?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPrecio">
          <Form.Label>Precio*</Form.Label>
          <Form.Control
            type="number"
            placeholder="Ej: 5000"
            // step={0.1}
            {...register("precio", {
              required: "El precio es un valor obligatorio",
              min: {
                value: 100,
                message:
                  "El precio minimo del producto debe ser de almenos $100",
              },
              max: {
                value: 1000000,
                message:
                  "El precio maximo de un producto debe ser de hasta $1000000",
              },
            })}
          />
          <Form.Text className="text-danger">
            {errors.precio?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formImagen">
          <Form.Label>Imagen URL*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: https://www.pexels.com/es-es/pizza/"
            {...register("imagen", {
              required: "La url de la imagen es un dato obligatorio",
              pattern: {
                value:
                  /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?(\.(jpg|jpeg|png|webp))$/,
                message:
                  "La imagen debe ser una url de imagen valida terminada en (jpg|jpeg|png|webp)",
              },
            })}
          />
          <Form.Text className="text-danger">
            {errors.imagen?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPrecio">
          <Form.Label>Categoría*</Form.Label>
          <Form.Select
            {...register("categoria", {
              required: "Debe seleccionar una categoria",
            })}
          >
            <option value="">Seleccione una opcion</option>
            <option value="Acompañamientos">Acompañamientos</option>
            <option value="Bebidas">Bebidas</option>
            <option value="Ensaladas">Ensaladas</option>
            <option value="Hamburguesas">Hamburguesas</option>
            <option value="Postres">Postres</option>
            <option value="Pizzas">Pizzas</option>
            <option value="Sándwiches y Wraps">Sándwiches y Wraps</option>
            <option value="Veggie/Veganas">Veggie/Veganas</option>
          </Form.Select>
          <Form.Text className="text-danger">
            {errors.categoria?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formImagen">
          <Form.Label>Descripción breve*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: Pizza tradicional con salsa de tomate, mozzarella y albahaca."
            as="textarea"
            {...register("descripcion_breve", {
              required: "La descripción breve es un dato obligatorio",
              minLength: {
                value: 5,
                message: "La descrición breve debe tener almenos 5 caracteres",
              },
              maxLength: {
                value: 250,
                message:
                  "La descrición breve debe tener como máximo 250 caracteres",
              },
            })}
          />
          <Form.Text className="text-danger">
            {errors.descripcion_breve?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formImagen">
          <Form.Label>Descripción Amplia*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: Nuestra pizza margarita artesanal hecha con masa madre, salsa de tomate casera, queso mozzarella de búfala premium y hojas frescas de albahaca. Horneada en horno de piedra para obtener ese crujiente perfecto."
            as="textarea"
            rows={4}
            {...register("descripcion_amplia", {
              required: "La descripción amplia es un dato obligatorio",
              minLength: {
                value: 10,
                message:
                  "La descrición amplia debe tener almenos 10 caracteres",
              },
              maxLength: {
                value: 500,
                message:
                  "La descrición amplia debe tener como máximo 500 caracteres",
              },
            })}
          />
          <Form.Text className="text-danger">
            {errors.descripcion_amplia?.message}
          </Form.Text>
        </Form.Group>

        <Button type="submit" variant="success">
          Guardar
        </Button>
      </Form>
    </section>
  );
};

export default FormularioProducto;
