<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-body">
            <h1 class="card-title text-center">Suscripción a la Carrera de Ingeniería Civil</h1>
            <form @submit.prevent="guardarSuscriptor">
              <div class="mb-3">
                <label for="cedula" class="form-label">Cédula</label>
                <input v-model="cedula" type="text" id="cedula" class="form-control" placeholder="C.I." required
                  inputmode="numeric" pattern="[0-9]*" oninput="this.value = this.value.replace(/[^0-9]/g, '');">
              </div>
              <div class="mb-3">
                <label for="nombre" class="form-label">Nombre</label>
                <input v-model="nombre" type="text" id="nombre" class="form-control" placeholder="Nombre" required>
              </div>
              <div class="mb-3">
                <label for="apellido" class="form-label">Apellido</label>
                <input v-model="apellido" type="text" id="apellido" class="form-control" placeholder="Apellido" required>
              </div>
              <div class="mb-3">
                <label for="correo" class="form-label">Correo Electrónico</label>
                <input v-model="correo" type="email" id="correo" class="form-control" placeholder="aaaa@correo.com"
                  required>
              </div>
              <div class="mb-3">
                <label for="telefono" class="form-label">Teléfono</label>
                <input v-model="telefono" type="tel" id="telefono" class="form-control" placeholder="Telefono" required>
              </div>
              <div class="mb-3">
                <label for="direccion" class="form-label">Dirección:</label>
                <input v-model="direccion" type="text" id="direccion" class="form-control" placeholder="Dirección"
                  required>
              </div>
              <button type="submit" class="btn btn-primary btn-block">Suscribirse</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>


  <h5 v-if="insertado" class="exitoso">Estudiante suscrito exitosamente</h5>
  <h5 v-if="noInsertado" class="noExitoso">El estudiante ya se ha suscrito</h5>
  <!-- <h4>{{ identificar }}</h4> -->

  <table v-if="tablaSuscriptor" class="table">
    <thead>
      <tr>
        <th scope="col">Id</th>
        <th scope="col">Nombre</th>
        <th scope="col">Apellido</th>
        <th scope="col">Cédula</th>
        <th scope="col">Correo</th>
        <th scope="col">Telefono</th>
        <th scope="col">Direccion</th>
        <th scope="col">Fecha</th>
        <th scope="col">Estado</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(sus, index) in suscriptor" :key="index">
        <th scope="row">{{ index + 1 }}</th>
        <td>{{ sus.nombre }}</td>
        <td>{{ sus.apellido }}</td>
        <td>{{ sus.cedula }}</td>
        <td>{{ sus.correo }}</td>
        <td>{{ sus.telefono }}</td>
        <td>{{ sus.direccion }}</td>
        <td>{{ sus.fechaSuscripcion }}</td>
        <td>{{ sus.estado }}</td>
      </tr>

    </tbody>
  </table>
</template>

<script>
import { agregarSuscripcionFachada, obtenerSuscripcionFachada } from "../helpers/SuscripcionCliente.js"
import AlertVue from './Alert.vue';
export default {
  data() {
    return {
      suscriptor: [],
      cedula: null,
      nombre: null,
      apellido: null,
      correo: null,
      telefono: null,
      direccion: null,
      fechaSuscripcion: null,
      estado: null,
      insertado: false,
      noInsertado: false,
      tablaSuscriptor: false
    };
  },
  methods: {
    async guardarSuscriptor() {
      const fechaActual = new Date();
      const fechaYHora = fechaActual.toISOString();

      const data = {
        cedula: this.cedula,
        nombre: this.nombre,
        apellido: this.apellido,
        correo: this.correo,
        telefono: this.telefono,
        direccion: this.direccion,
        fechaSuscripcion: fechaYHora,
        estado: "activo"
      };

      const identificar = await agregarSuscripcionFachada(data);

      if (identificar) {
        this.insertado = true;
        this.noInsertado = false;
        this.suscriptor.push(data); // Agrega el nuevo suscriptor al array
        this.tablaSuscriptor = true;
      } else {
        this.noInsertado = true;
        this.insertado = false;
        this.tablaSuscriptor = false;
      }

      this.limpiarCampos();

      try {
        const cedula = this.cedula; // Reemplaza con la cédula que desees
        const response = await obtenerSuscripcionFachada(cedula);
        this.suscriptor = [response]; // Actualiza el array con los datos de la consulta
      } catch (error) {
        console.error(error);
      }
    },
    limpiarCampos() {
      this.cedula = '';
      this.nombre = '';
      this.apellido = '';
      this.correo = '';
      this.telefono = '';
      this.direccion = '';
    },
  }
};
</script>

<style>

body{
  margin-top: 5%;
}
.exitoso {
  border: 2px solid green;
  border-radius: 5px;
  /* Agregar un borde redondeado */
  color: green;
  padding: 2% 10px;
  /* Añadir padding solo en los lados */
  background-color: #daffda;
  margin: 10px 5% 10px;
  /* Margen arriba, margen izquierdo y derecho, sin margen abajo */
}

.noExitoso {
  border: 2px solid red;
  border-radius: 5px;
  /* Agregar un borde redondeado */
  color: red;
  padding: 2% 10px;
  /* Añadir padding solo en los lados */
  background-color: #ffdada;
  margin: 10px 5% 10px;
  /* Sin margen arriba, margen izquierdo y derecho, margen abajo */
}

/* Media queries para ajustar los estilos en pantallas más pequeñas */
@media (max-width: 768px) {

  .exitoso,
  .noExitoso {
    padding: 5px 10px;
    /* Reducir el padding en los márgenes superior e inferior */
    margin: 10px 5% 10px;
    /* Margen arriba, margen izquierdo y derecho, margen abajo */
  }
}
</style>