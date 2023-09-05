import axios from "axios"

export const agregarSuscripcionFachada=async(body)=>{
    return await agregarSuscripcion(body)
}

export const obtenerSuscripcionFachada=async(cedula)=>{
    return await obtenerSuscripcion(cedula)
}

const agregarSuscripcion=async(body)=>{

    return axios.post(`http://localhost:8080/API/v1.0/Civil/suscriptores`, body).then(r => r.data)
}

const obtenerSuscripcion=async(cedula)=>{

    const data=await fetch(`http://localhost:8080/API/V1.0/Civil/suscriptores/${cedula}`).then(r =>r.json());
    console.log(data);
    return data;
}

