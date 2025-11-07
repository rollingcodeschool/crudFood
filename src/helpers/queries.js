const productosBackend = import.meta.env.VITE_API_PRODUCTOS
const usuariosBackend = import.meta.env.VITE_API_USUARIOS

console.log(productosBackend)

export const listarProductos = async ()=>{
    try {
        const respuesta = await fetch(productosBackend)
        console.log(respuesta)
        return respuesta
    } catch (error) {
        console.error(error)
        return null
    }
}
export const obtenerProductoPorID = async (id)=>{
    try {
        const respuesta = await fetch(`${productosBackend}/${id}`)
        console.log(respuesta)
        return respuesta
    } catch (error) {
        console.error(error)
        return null
    }
}
export const editarProductoAPI = async (id, producto)=>{
    try {
        const respuesta = await fetch(productosBackend+'/'+id,{
            method: 'PUT',
            headers:{
                'Content-Type':'application/json',
                'x-token': JSON.parse(sessionStorage.getItem('usuarioKey')).token
            },
            body: JSON.stringify(producto)
        })
        console.log(respuesta)
        return respuesta
    } catch (error) {
        console.error(error)
        return null
    }
}
export const borrarProductoAPI = async (id)=>{
    try {
        const respuesta = await fetch(productosBackend+'/'+id,{
            method: 'DELETE',
            headers:{
                'x-token': JSON.parse(sessionStorage.getItem('usuarioKey')).token
            }
        })
        console.log(respuesta)
        return respuesta
    } catch (error) {
        console.error(error)
        return null
    }
}

export const crearProducto = async (producto)=>{
    try {
        console.log(producto)
        const respuesta = await fetch(productosBackend,{
            method: 'POST',
            headers:{
                'Content-Type':'application/json',
                'x-token': JSON.parse(sessionStorage.getItem('usuarioKey')).token
            },
            body: JSON.stringify(producto)
        })
        console.log(respuesta)
        return respuesta
    } catch (error) {
        console.error(error)
        return null
    }
}

export const login = async (usuario)=>{
    try {
        const respuesta = await fetch(usuariosBackend+'/login',{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(usuario)
        })
        console.log(respuesta)
        return respuesta
    } catch (error) {
        console.error(error)
        return null
    }
}