<template>
  <div v-if="isEditar" class="overlay">
    <div class="cuadro-confirmacion">
      <p>Por favor, ingrese su cedula para poder editar</p>
      <input v-model="textoConfirmacion" type="text" />
      <button @click="confirmarEdicion">Confirmar</button>
      <button @click="cancelarEdicion">Cancelar</button>
    </div>
  </div>
</template>

<script>
import { verificarSuscriptorFachada} from "../helpers/ForoCliente";

export default {
  props: {
    isEditar:{
        type:Boolean,
        require:true
    },
    idTema:{
        type:Number,
        require:true,
    }
  },

  methods: {
    cancelarEdicion(){
      this.$emit("enviarCancelacionEdicion",false);
      this.textoConfirmacion = "";
    },
    async confirmarEdicion() {
      try {
        const response = await verificarSuscriptorFachada(this.textoConfirmacion);
        console.log("response status: " + response.status);
        if (response.status === 200) {
          this.$emit("enviarTextoCedulaEdicion",this.textoConfirmacion,this.idTema);
        } else if (response.status === 204) {
          alert("No coincide con suscriptor, intente nuevamente");
        }
      } catch (error) {
        alert("No coincide con suscriptor, intente nuevamente");
        console.error("Error al confirmar eliminación:", error);
      } finally {
        this.$emit("enviarFinallyEdicion",false);
        this.textoConfirmacion = "";
      }
    },
  },
};
</script>

<style scoped>
.cuadro-confirmacion {
  background-color: #fff;
  border: 1px solid #ccc;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  padding: 20px;
  text-align: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  border-radius: 25px;
}

.cuadro-confirmacion p {
  margin-bottom: 20px;
}

.cuadro-confirmacion input[type="text"] {
  width: 100%;
  padding: 5px;
  margin-bottom: 10px;
}

.cuadro-confirmacion button {
  margin-right: 10px;
  padding: 5px 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
}

.cuadro-confirmacion button.cancelar {
  background-color: #ccc;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 999;
}
</style>
