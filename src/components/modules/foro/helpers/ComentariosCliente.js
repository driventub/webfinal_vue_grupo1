import axios from "axios";

export const obtenerComentariosPorIdForoFachada = (id) => {
  return obtenerComentariosPorIdForo(id);
};

export const guardarComentarioPorForoFachada = (comentario) => {
  return guardarComentarioPorForo(comentario);
};


export const obtenerSuscriptorPorIdComentFachada=(id)=>{
return obtenerSuscriptorPorIdComent(id);
}


const obtenerComentariosPorIdForo = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/API/v1.0/Civil/discuciones/${id}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

const guardarComentarioPorForo = async (comentario) => {
  try {
    const response = await axios.post(
      `http://localhost:8080/API/v1.0/Civil/discuciones`,
      comentario
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

const obtenerSuscriptorPorIdComent = async (id) => {
  try {                              
    const response = await axios.get(`http://localhost:8080/API/v1.0/Civil/suscriptores/sus/${id}`);
    return response;
  } catch (error) {
    console.log(error)
  }
};
