import axios from "axios"

export const agregarSuscripcionFachada=async(body)=>{
    return await agregarSuscripcion(body)
}

const agregarSuscripcion=async(body)=>{

    return axios.post(`http://localhost:8080/API/v1.0/Civil/suscriptores`, body).then(r => r.data)
}