<template>
  <div class="contenedorComentario">

      <div>
        <input type="text" v-model="cedula" required @input="validarCedula" placeholder="Cedula de suscriptor" />
        <div
          v-if="mostrarMensajeCedula"
          class="mensaje-validacion"
          :style="mensajeCedulaStyle" >
          {{ mensajeCedula }}
        </div>
      </div>
      <div>
        <input
          type="text"
          placeholder="Escribe un comentario"
          v-model="comentario"
        />
      </div>
   
    <div>
      <button class="btn btn-success" @click="validarComentar">Comentar</button>
    </div>
   
  </div>
</template>

<script>
import { guardarComentarioPorForoFachada } from "../helpers/ComentariosCliente";
import{verificarSuscriptorFachada} from "../helpers/ForoCliente";
export default {
  props: {
    idTem: {
      type: Number,
      require: true,
    },
  },
  data() {
    return {
      cedula: null,
      comentario: null,
    };
  },
  methods: {
    async comentar() {
      const fechaActual = new Date();
      const fechaActualEnTexto = fechaActual.toISOString();

      const discu = {
        mensaje: this.comentario,
        fecha: fechaActualEnTexto,
      };

      const data = {
        discuForo: discu,
        idForo: this.idTem,
        cedulaEstu: this.cedula,
      };
      const response = await guardarComentarioPorForoFachada(data);
      if (response.status == 200) {
        alert("Comentario realizado");
      } else {
        alert("Comentario no realizado");
      }
    },
    async validarComentar(){
      const response = await verificarSuscriptorFachada(this.cedula);
         console.log("para crear el foro, verificando status: "+response.status); 
         if(response.status==200){
           this.comentar();
           this.$emit("cedulaComentario",this.cedula);
         }else{
          alert("No esxiste suscripcion, registrese por favor")
         }
    },
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

<style scoped>
.contenedorComentario {
  display: flex;
  justify-content: center;
  border: 1px solid rgb(85, 85, 85);
  padding: 10px;
  border-radius: 15px;
}
</style>
