<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-body">
            <h1 class="card-title text-center">Suscripción a la Carrera de Ingeniería Civil</h1>
            <form @submit.prevent="guardarSuscriptor">
              <div class="mb-3">
                <label for="cedula" class="form-label">Cédula:</label>
                <input v-model="cedula" type="number" id="cedula" class="form-control" placeholder="C.I." required>
              </div>
              <div class="mb-3">
                <label for="nombre" class="form-label">Nombre:</label>
                <input v-model="nombre" type="text" id="nombre" class="form-control" placeholder="Nombre" required>
              </div>
              <div class="mb-3">
                <label for="apellido" class="form-label">Apellido:</label>
                <input v-model="apellido" type="text" id="apellido" class="form-control" placeholder="Apellido" required>
              </div>
              <div class="mb-3">
                <label for="correo" class="form-label">Correo Electrónico:</label>
                <input v-model="correo" type="email" id="correo" class="form-control" placeholder="aaaa@correo.com"
                  required>
              </div>
              <div class="mb-3">
                <label for="telefono" class="form-label">Teléfono:</label>
                <input v-model="telefono" type="tel" id="telefono" class="form-control" placeholder="(+593)-000-000-000"
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


  <h5 v-if="insertado">Estudiante suscrito exitosamente</h5>
  <h5 v-if="noInsertado">El estudiante ya se ha suscrito</h5>
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
/* .subscription-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.subscription-form {
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  padding: 20px;
  width: 100%;
  max-width: 600px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
  color: #555;
}

.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.btn-primary {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.footer {
  background-color: #333;
  color: #fff;
  padding: 20px 0;
  margin-top: 50px;
} */
</style>