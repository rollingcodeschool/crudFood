import { Navigate, Outlet } from "react-router";

const ProtectorAdmin = ({usuarioLogueado}) => {
    // si no estoy logueado
    if(!usuarioLogueado.usuario){
        return <Navigate to={"/login"} />
    }
    return <Outlet />
};

export default ProtectorAdmin;