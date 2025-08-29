import Menu from "./components/shared/Menu";
import Footer from "./components/shared/Footer";
import Inicio from "./components/pages/Inicio";
import DetalleProducto from "./components/pages/DetalleProducto";
import Administrador from "./components/pages/Administrador";
import FormularioProducto from "./components/pages/producto/FormularioProducto";
import Error404 from "./components/pages/Error404";
import Login from "./components/pages/Login";
import { BrowserRouter, Routes, Route } from "react-router";
BrowserRouter;

function App() {
  return (
    <>
      <BrowserRouter>
        <Menu></Menu>
        <main>
          <Routes>
            <Route path="/" element={<Inicio></Inicio>} />
            <Route
              path="/detalle"
              element={<DetalleProducto></DetalleProducto>}
            />
            <Route path="/login" element={<Login></Login>} />
            <Route
              path="/administrador"
              element={<Administrador></Administrador>}
            />
            <Route
              path="/administrador/crear"
              element={<FormularioProducto></FormularioProducto>}
            />
            <Route
              path="/administrador/editar"
              element={<FormularioProducto></FormularioProducto>}
            />
            <Route path="*" element={<Error404></Error404>} />
          </Routes>
        </main>
        <Footer></Footer>
      </BrowserRouter>
    </>
  );
}

export default App;
