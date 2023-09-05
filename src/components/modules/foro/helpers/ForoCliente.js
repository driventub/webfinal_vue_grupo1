import axios from "axios";

export const listarForosFachada = () => {
  return listarForos();
};

export const crearForoFachada = (foro) => {
  return crearForo(foro);
};

export const listarPorAsuntoFachada = (asunto) => {
  return listarPorAsunto(asunto);
};

export const obtenerForoPorIDFachada = (id) => {
  return obtenerForoPorID(id);
};

export const actualizarForoFachada = (foro) => {
  return actualizarForo(foro);
};

export const obtenerNumeroComentariosFachada = (id) => {
  return obtenerNumeroComentarios(id);
};

export const eliminarTemaPorIdFachada = (id) => {
  return eliminarTemaPorId(id);
};

export const verificarParaEliminarFachada = (idForo, cedula) => {
  return verificarParaEliminar(idForo, cedula);
};


export const verificarSuscriptorFachada=(cedula)=>{
  return verificarSuscriptor(cedula);
}

export const obtenerSuscriptorFachada=(cedula)=>{
  return obtenerSuscriptor(cedula);
}

const listarForos = async () => {
  try {
    const response = await axios.get(
      `http://localhost:8080/API/v1.0/Civil/foros`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

const crearForo = async (foro) => {
  try {
    const response = await axios.post(
      `http://localhost:8080/API/v1.0/Civil/foros`,
      foro
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

const listarPorAsunto = async (asunto) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/API/v1.0/Civil/foros/asun/${asunto}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

const obtenerForoPorID = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/API/v1.0/Civil/foros/id/${id}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

const actualizarForo = async (foro) => {
  try {
    const response = await axios.put(
      `http://localhost:8080/API/v1.0/Civil/foros`,
      foro
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

const obtenerNumeroComentarios = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/API/v1.0/Civil/foros/comen/${id}`
    );
    console.log("numero comentarios en cliente: " + response.data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const eliminarTemaPorId = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:8080/API/v1.0/Civil/foros/${id}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

const verificarParaEliminar = (idForo, cedula) => {
  try {
    const response = axios.get(
      `http://localhost:8080/API/v1.0/Civil/foros/verify`,
      {
        params: {
          idForo: idForo,
          cedula: cedula,
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

const verificarSuscriptor = async(cedula) => {
  try {
   const response =await axios.get(`http://localhost:8080/API/v1.0/Civil/suscriptores/verify/${cedula}`);
      return response;
  } catch (error) {
    console.log(error);
  }
};

const obtenerSuscriptor = async(cedula) => {
  try {
   const response =await axios.get(`http://localhost:8080/API/v1.0/Civil/suscriptores/${cedula}`);
      return response;
  } catch (error) {
    console.log(error);
  }
};
