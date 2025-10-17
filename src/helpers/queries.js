const productosBackend = import.meta.env.VITE_API_PRODUCTOS

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