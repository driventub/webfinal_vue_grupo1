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
                <input v-model="cedula" type="number" id="cedula" class="form-control" placeholder="C.I." required>
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
                <input v-model="telefono" type="tel" id="telefono" class="form-control" placeholder="Telefono"
                  required>
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
</template>

<script>
import { agregarSuscripcionFachada } from "../helpers/SuscripcionCliente.js"
import AlertVue from './Alert.vue';
export default {
  data() {
    return {
      cedula: null,
      nombre: null,
      apellido: null,
      correo: null,
      telefono: null,
      direccion: null,
      fechaSuscripcion: null,
      estado: null,
      insertado: false,
      noInsertado: false
      // identificar: false

    };
  },
  methods: {
    async guardarSuscriptor() {

      const fechaActual = new Date();

      // Obtiene la fecha y la hora en formato de cadena de texto compatible con ISO 8601
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

      }
      const identificar = await agregarSuscripcionFachada(data)
      console.log(identificar)
      if (identificar) {
        console.log('Estudiante insertado' + identificar[2])
        this.insertado = true
        this.noInsertado = false
      } else {

        console.log('Estudiante no insertado' + identificar[2])
        this.noInsertado = true
        this.insertado = false
      }
      this.limpiarCampos()

    }, limpiarCampos() {
      this.cedula = '',
        this.nombre = '',
        this.apellido = '',
        this.correo = '',
        this.telefono = '',
        this.direccion = ''
    },
    
  }
};
</script>

<style>
.exitoso {
  border: 2px solid green;
  border-radius: 5px; /* Agregar un borde redondeado */
  color: green;
  padding: 2% 10px; /* Añadir padding solo en los lados */
  background-color: #daffda;
  margin: 10px 10% 0; /* Margen arriba, margen izquierdo y derecho, sin margen abajo */
}

.noExitoso {
  border: 2px solid red;
  border-radius: 5px; /* Agregar un borde redondeado */
  color: red;
  padding: 2% 10px; /* Añadir padding solo en los lados */
  background-color: #ffdada;
  margin: 0 10% 10px; /* Sin margen arriba, margen izquierdo y derecho, margen abajo */
}

/* Media queries para ajustar los estilos en pantallas más pequeñas */
@media (max-width: 768px) {
  .exitoso, .noExitoso {
    padding: 5px 10px; /* Reducir el padding en los márgenes superior e inferior */
    margin: 10px 5% 10px; /* Margen arriba, margen izquierdo y derecho, margen abajo */
  }
}
</style>