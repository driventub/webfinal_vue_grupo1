<template>
  <div v-if="isMostrar">
    <div>
      <label for="cedula">Cedula</label>
      <input type="text" v-model="cedula" required @input="validarCedula" />
      <div
        v-if="mostrarMensajeCedula"
        class="mensaje-validacion"
        :style="mensajeCedulaStyle"
      >
        {{ mensajeCedula }}
      </div>
    </div>
    <div>
      <label for="asunto">Tema</label>
      <input type="text" v-model="asunto" required />
    </div>
    <div class="form-floating">
      <label for="floatingTextarea">Mensaje</label>
      <textarea
        id="floatingTextarea"
        class="form-control"
        placeholder="Leave a comment here"
        v-model="mensaje"
        required
      ></textarea>
    </div>
    <div>
      <label for="tag">Tag</label>
      <input v-model="tag" required />
    </div>

    <div>
      <button @click="validarExistenciaDeSuscriptor">Enviar al foro</button>
      <button @click="cancelar">Cancelar</button>
    </div>
  </div>
</template>

<script>
import { crearForoFachada, verificarSuscriptorFachada } from "../helpers/ForoCliente";


export default {
  props: {
    isMostrar: {
      type: Boolean,
      require: true,
    },
  },
  data() {
    return {
      cedula: null,
      anadir: true,
      asunto: null,
      mensaje: null,
      tag: null,

      mostrarMensajeCedula: false,
      mensajeCedula: "",
    };
  },
  methods: {
    validarCedula() {
      const cedula = this.cedula;

      // Verifica si la longitud de la cédula es igual a 10
      if (cedula.length === 10) {
        this.mostrarMensajeCedula = false;
        this.mensajeCedula = "";
      } else {
        this.mostrarMensajeCedula = true;
        this.mensajeCedula = "La cédula debe tener exactamente 10 caracteres.";
      }
    },
    async enviarForo() {
      const fechaActual = new Date();
      const fechaActualEnTexto = fechaActual.toISOString();

      const foro = {
        tag: this.tag,
        fechaCreacion: fechaActualEnTexto,
      };

      const data = {
        foro: foro,
        asunto: this.asunto,
        mensaje: this.mensaje,
        cedulaEstudiante: this.cedula,
      };

      const response = await crearForoFachada(data);
      if (response.status == 200) {
        alert("foro creado");
      } else {
        alert("no se pudo crear el foro");
      }
    },
    
    async validarExistenciaDeSuscriptor(){
         const response = await verificarSuscriptorFachada(this.cedula);
console.log("para crear el foro, verificando status: "+response.status);
         if(response.status==200){
          this.enviarForo();
         }else{
          alert("No esxiste suscripcion, registrese por favor")
         }
    },
    cancelar() {
      this.$emit("cancelar", true);
    },
  },
  computed: {
    mensajeCedulaStyle() {
      return {
        color: this.mensajeCedulaColor,
        fontSize: "10px",
      };
    },
    mensajeCedulaColor() {
      return this.cedula && this.cedula.length === 10 ? "green" : "red";
    },
  },
};
</script>

<style scoped></style>
