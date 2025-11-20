const productosBackend = import.meta.env.VITE_API_PRODUCTOS;
const usuariosBackend = import.meta.env.VITE_API_USUARIOS;
const URLProductoPaginados = productosBackend + "/paginacion";

console.log(productosBackend);

export const listarProductos = async () => {
  try {
    const respuesta = await fetch(productosBackend);
    console.log(respuesta);
    return respuesta;
  } catch (error) {
    console.error(error);
    return null;
  }
};
export const obtenerProductoPorID = async (id) => {
  try {
    const respuesta = await fetch(`${productosBackend}/${id}`);
    console.log(respuesta);
    return respuesta;
  } catch (error) {
    console.error(error);
    return null;
  }
};
export const editarProductoAPI = async (id, producto) => {
  try {
    const formData = new FormData();
    formData.append("nombreProducto", producto.nombreProducto);
    formData.append("precio", producto.precio);
    formData.append("categoria", producto.categoria);
    formData.append("descripcion_breve", producto.descripcion_breve);
    formData.append("descripcion_amplia", producto.descripcion_amplia);
    // formData.append("imagen", producto.imagen);
    if (producto.imagen instanceof File) {
      formData.append("imagen", producto.imagen);
    }

    const respuesta = await fetch(productosBackend + "/" + id, {
      method: "PUT",
      headers: {
        "x-token": JSON.parse(sessionStorage.getItem("usuarioKey")).token,
      },
      body: formData,
    });
    console.log(respuesta);
    return respuesta;
  } catch (error) {
    console.error(error);
    return null;
  }
};
export const borrarProductoAPI = async (id) => {
  try {
    const respuesta = await fetch(productosBackend + "/" + id, {
      method: "DELETE",
      headers: {
        "x-token": JSON.parse(sessionStorage.getItem("usuarioKey")).token,
      },
    });
    console.log(respuesta);
    return respuesta;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const crearProducto = async (producto) => {
  try {
    const formData = new FormData();
    formData.append("nombreProducto", producto.nombreProducto);
    formData.append("precio", producto.precio);
    formData.append("categoria", producto.categoria);
    formData.append("descripcion_breve", producto.descripcion_breve);
    formData.append("descripcion_amplia", producto.descripcion_amplia);
    formData.append("imagen", producto.imagen);

    const respuesta = await fetch(productosBackend, {
      method: "POST",
      headers: {
        "x-token": JSON.parse(sessionStorage.getItem("usuarioKey")).token,
      },
      body: formData,
    });
    console.log(respuesta);
    return respuesta;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const login = async (usuario) => {
  try {
    const respuesta = await fetch(usuariosBackend + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    });
    console.log(respuesta);
    return respuesta;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const leerProductosPaginadosAPI = async (page = 1, limit = 10) => {
  try {
    const respuesta = await fetch(
      `${URLProductoPaginados}?page=${page}&limit=${limit}`
    );
    return respuesta;
  } catch (error) {
    console.error(error);
    return false;
  }
};
