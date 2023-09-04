import axios from "axios";

export const obtenerQuejaFachada=async(id)=>{
    console.log('Axios');
    return await obtenerQuejaAxios(id);
}

export const ingresarQuejaFachada=(bodyQueja)=>{
    ingresarQuejaAPI(bodyQueja);
}

export const actualizarQuejaFachada=(bodyQueja,id)=>{
    actualizarQuejaAPI(bodyQueja,id);
}

export const eliminarQuejaFachada=(id)=>{
    eliminarQuejaAPI(id);
}

export const buscarTodosFachada = () => {
    return buscarTodos();
  };

//----------------------------------------------------------------------
//----------------------------------------------------------------------
//----------------------------------------------------------------------
//----------------------------------------------------------------------


const ingresarQuejaAPI=(bodyQueja)=>{

    axios.post(`http://localhost:8080/API/v1.0/Civil/quejas` , bodyQueja).then(r=>r.data);
}

const actualizarQuejaAPI=(bodyQueja,id)=>{

    axios.put(`http://localhost:8080/API/v1.0/Civil/quejas/${id}` , bodyQueja).then(r=>r.data);
}

const eliminarQuejaAPI=(id)=>{

    axios.delete(`http://localhost:8080/API/v1.0/Civil/quejas/${id}`).then(r=>r.data);
}

const obtenerQuejaAxios=async(id)=>{

    const data = axios.get(`http://localhost:8080/API/v1.0/Civil/quejas/${id}`).then(r=>r.data);
    console.log("desde el metodo>>>> " + data);
    return data;
}

const buscarTodos = () => {
    return axios
      .get(`http://localhost:8080/API/v1.0/Civil/quejas`)
  };

