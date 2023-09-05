export const formatearFecha=(fecha)=> {
    const nombresMeses = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];

    const fechaLocal = new Date(fecha);
    const year = fechaLocal.getFullYear();
    const day = fechaLocal.getDate();
    const monthIndex = fechaLocal.getMonth();
    const month = nombresMeses[monthIndex];

    return `${day} de ${month}, ${year}  `;
  };