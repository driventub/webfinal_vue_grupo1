<template>
  <div>
    <div>
      <div>
        <label>{{ nombre }} {{ apellido }}</label>
      </div>

      <div>
        <label for="cedula">Cedula</label>
        <input type="text" v-model="cedulaRecibida" disabled />
      </div>
      <div>
        <label for="asunto">Asunto</label>
        <input type="text" v-model="asunto" required />
      </div>
      <div>
        <label for="mensaje">Mensaje</label>
        <textarea v-model="mensaje" required></textarea>
      </div>
    </div>
    <div>
      <button @click="actualizarForo">Actualizar</button>
      <button @click="cancelar">Cancelar</button>
    </div>
  </div>
</template>

<script>
import {
  actualizarForoFachada,
  obtenerSuscriptorFachada,
} from "../helpers/ForoCliente";
import { obtenerForoPorIDFachada } from "../helpers/ForoCliente";

export default {
  props: {
    idTema: {
      type: Number,
      require: true,
    },
    cedula: {
      type: String,
      require: true,
    },
  },

  data() {
    return {
      asunto: null,
      mensaje: null,

      nombre: null,
      apellido: null,
      cedulaRecibida:this.cedula,
    };
  },
  methods: {
    cancelar(){
      /// aqui hacer el router -1
    },
    async cargarDatos() {
          const response = await obtenerForoPorIDFachada(this.idTema);
      console.log("cargando datos del tema de foro " + response.data);
      const data = response.data;
      this.asunto = data.asunto;
      this.mensaje = data.mensaje;
    },
    async cargarNombresApellidos() {
      const response = await obtenerSuscriptorFachada(this.cedula);
      console.log("cargando datos del suscriptor " + response.data);
      const data = response.data;
      this.nombre = data.nombre;
      this.apellido = data.apellido;
    },
    async actualizarForo() {
      const foro = {
        "id": this.idTema,
      };
      const data = {
        "asunto": this.asunto,
        "mensaje": this.mensaje,
        "foro": foro,
      };

      const response = await actualizarForoFachada(data);
      if (response.status == 200) {
        alert("Tema de for actualizado correctamente");
       // this.$router.go(-1);
      } else {
        alert("No se pudo actualizar, ingrese correctamente los datos");
      }
    },
  },
  mounted() {
   
    this.cargarDatos();
    this.cargarNombresApellidos();
  },
};
</script>

<style></style>
