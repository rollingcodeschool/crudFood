import Menu from "./components/shared/Menu";
import Footer from "./components/shared/Footer";
import Inicio from "./components/pages/Inicio";
import DetalleProducto from "./components/pages/DetalleProducto";
import Administrador from "./components/pages/Administrador";
import FormularioProducto from "./components/pages/producto/FormularioProducto";
import Error404 from "./components/pages/Error404";
import Login from "./components/pages/Login";
import { BrowserRouter, Routes, Route } from "react-router";
import { useEffect, useState } from "react";
import ProtectorAdmin from "./components/routes/ProtectorAdmin";
import { set } from "react-hook-form";
BrowserRouter;

function App() {
  const sesionUsuario =
    JSON.parse(sessionStorage.getItem("usuarioKey")) || false;
  const productosLS = JSON.parse(localStorage.getItem("productosKey")) || [];
  const [usuarioLogueado, setUsuarioLogueado] = useState(sesionUsuario);
  const [productos, setProductos] = useState(productosLS);

  useEffect(() => {
    sessionStorage.setItem("usuarioKey", JSON.stringify(usuarioLogueado));
  }, [usuarioLogueado]);

  useEffect(() => {
    localStorage.setItem("productosKey", JSON.stringify(productos));
  }, [productos]);

  const crearProducto = (productoNuevo) => {
    setProductos([...productos, productoNuevo]);
    return true;
  };

  const borrarProducto = (idProducto) => {
    const productosFiltrados = productos.filter(
      (itemProducto) => itemProducto.id !== idProducto
    );
    setProductos(productosFiltrados);
    return true;
  };

  const buscarProducto = (idProducto) => {
    console.log(idProducto);
    // const productoBuscado = productos.find(
    //   (itemProducto) => itemProducto.id === idProducto
    // );
    const productoBuscado = productos.find((prod)=> prod.id === idProducto)
    console.log(productoBuscado);
    return productoBuscado;
  };

  const modificarProducto = (idProducto, datosProducto) => {
    const productosActualizados = productos.map((itemProducto) => {
      if (itemProducto.id === idProducto) {
        //actualizar el producto
        return {
          ...itemProducto,
          ...datosProducto,
        };
      }
      return itemProducto;
    });
    //actualizar el state
    setProductos(productosActualizados);
    return true;
  };

  return (
    <>
      <BrowserRouter>
        <Menu
          usuarioLogueado={usuarioLogueado}
          setUsuarioLogueado={setUsuarioLogueado}
        ></Menu>
        <main className="container my-3">
          <Routes>
            <Route path="/" element={<Inicio></Inicio>} />
            <Route
              path="/detalle"
              element={<DetalleProducto></DetalleProducto>}
            />
            <Route
              path="/login"
              element={<Login setUsuarioLogueado={setUsuarioLogueado}></Login>}
            />
            <Route
              path="/administrador"
              element={
                <ProtectorAdmin
                  usuarioLogueado={usuarioLogueado}
                ></ProtectorAdmin>
              }
            >
              <Route
                index
                element={
                  <Administrador
                    setProductos={setProductos}
                    productos={productos}
                    borrarProducto={borrarProducto}
                  ></Administrador>
                }
              />
              <Route
                path="crear"
                element={
                  <FormularioProducto
                    titulo="Crear Producto"
                    crearProducto={crearProducto}
                  ></FormularioProducto>
                }
              />
              <Route
                path="editar/:id"
                element={
                  <FormularioProducto
                    titulo="Editar Producto"
                    buscarProducto={buscarProducto}
                    modificarProducto={modificarProducto}
                  ></FormularioProducto>
                }
              />
            </Route>

            <Route path="*" element={<Error404></Error404>} />
          </Routes>
        </main>
        <Footer></Footer>
      </BrowserRouter>
    </>
  );
}

export default App;
