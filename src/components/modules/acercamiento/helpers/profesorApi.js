import axios from "axios"


export const insertarFachada = async(formData) => {
    await insertar(formData)
}

const insertar = async(formData) => {
    await axios.post(`http://localhost:8080/API/v1.0/Civil/profesores`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
}