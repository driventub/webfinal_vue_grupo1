import axios from "axios";

export const obtenerFachada = () =>
{
    return obtener();
};


const obtener = async () =>
{
    return await axios
        .get( `http://localhost:8080/API/v1.0/Civil/noticias` )

};