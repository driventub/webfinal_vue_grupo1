import axios from "axios";

export const insertarFachada = async (formdata) => {
  await insertar(formdata);
};

const insertar = async (formData) => {
  // Send the FormData to your API endpoint
  await axios.post("http://localhost:8080/API/v1.0/Civil/noticias", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
