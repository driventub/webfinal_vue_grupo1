import axios from "axios";

export const obtenerComentariosPorIdForoFachada=(id)=>{
    return obtenerComentariosPorIdForo(id);
}

export const guardarComentarioPorForoFachada=(comentario)=>{
 return guardarComentarioPorForo(comentario);
}

const obtenerComentariosPorIdForo= async(id)=>{
    try{
    const response = await axios.get(`http://localhost:8080/API/v1.0/Civil/discuciones/${id}`);
    console.log("Obteniendo datos comentarios en cliente: "+response.data[0]);
    return response;
    }catch(error){
         console.log(error);
    }
}


const guardarComentarioPorForo=async(comentario)=>{
    try{
         const response = await axios.post(`http://localhost:8080/API/v1.0/Civil/discuciones`,comentario);
         return response;
    }catch(error){
         console.log(error);
    }
}
