<template>
  <div v-if="eliminarConf" class="overlay">
    <div class="cuadro-confirmacion">
      <p>Por favor, confirme la eliminación ingresando su cedula:</p>
      <input v-model="textoConfirmacion" type="text" />
      <button @click="confirmarEliminacion">Eliminar</button>
      <button @click="cancelarEliminacion">Cancelar</button>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    eliminarConf:{
      type:Boolean,
      require:true,
    },
    idTema:{
      type:Boolean,
      require:true,
    }
  },
  data() {
    return {
      textoConfirmacion :"",
    };
  },
  methods:{
    cancelarEliminacion() {
      this.$emit("cancelarElim",false);
      this.textoConfirmacion = "";
    },
    async eliminarTema(id) {
      console.log("Eliminar tema " + id);
      const response = await eliminarTemaPorIdFachada(id);
      if (response.data == 1) {
        alert("Tema eliminado");
        this.cargarForos();
      }
    },
    async confirmarEliminacion() {
      try {
        const response = await verificarParaEliminarFachada(this.idTema,this.textoConfirmacion);
        console.log("response status: " + response.status);
        if (response.status === 200) {
          await this.eliminarTema(this.idTema);
          this.cargarForos();
        } else if (response.status === 204) {
          alert("No coincide con suscriptor, intente nuevamente");
        }
      } catch (error) {
        alert("No coincide con suscriptor, intente nuevamente");
        console.error("Error al confirmar eliminación:", error);
      } finally {
        this.$emit("enviarFinallyElimiar",false);
        this.textoConfirmacion = "";
      }
    },
  },
  mounted(){
  
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
