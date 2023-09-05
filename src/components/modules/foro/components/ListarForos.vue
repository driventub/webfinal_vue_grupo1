<template>
  <div class="contenedor" v-for="f in listaForos" :key="f.id">
    <div @click="abrirTema(f.id)" class="detalles">
      <span class="asunto">{{ f.asunto }}</span>
      <span>{{ f.mensaje }}</span>
      <span class="fechaC">{{ formatoFecha(f.fechaCreacion) }}</span>
    </div>
    <div class="btn-acciones">
      <button @click="confirmarEditarTema(f.id)" title="Editar">
        <i class="bi bi-pencil-square"></i>
      </button>
      <button @click="confirmarEliminarTema(f.id)" title="Eliminar">
        <i class="bi bi-x-octagon"></i>
      </button>
    </div>

    <EditarConfirmacion
      :isEditar="editarConfirmacion"
      :idTema="f.id"
      @enviarCancelacionEdicion="cancelado"
      @enviarTextoCedulaEdicion="recibirCedula"
    ></EditarConfirmacion>
    <EliminarConfirmacion :eliminarConf="elimConfirmacion"
    @cancelarElim="cancelarEl"
    :idTema="f.id"
    @enviarFinallyElimiar="errorDelete"
    ></EliminarConfirmacion>
  </div>
</template>

<script>
import {
  listarForosFachada,
} from "../helpers/ForoCliente";
import { formatearFecha } from "../helpers/Utilities";
import EditarConfirmacion from "./EditarConfirmacion.vue";
import EliminarConfirmacion from "./EliminarConfirmacion.vue";
export default {
  components: {
    EditarConfirmacion,
    EliminarConfirmacion,
  },
  data() {
    return {
      listaForos: [],
      elimConfirmacion: false,
      editarConfirmacion: false,
      textoConfirmacion: "",
      cedula: null,
    };
  },
  methods: {
    cancelarUpda(value){
     this.editarConfirmacion=value;
     this.cargarForos();
    },
    cancelarEl(value){
     this.elimConfirmacion=value;
    },
    cancelado(value) {
      this.editarConfirmacion = value;
    },
    errorDelete(value){
     this.elimConfirmacion=false;
    },
    confirmarEditarTema(){
        this.editarConfirmacion=true;
    },
    confirmarEliminarTema(){
      console.log("clickeando en eliminar");
      this.elimConfirmacion = true;
    },
    async cargarForos() {
      const response = await listarForosFachada();
      this.listaForos = response.data;
      this.$emit("numForos", this.listaForos.length);
    },
    abrirTema(id) {
      console.log("abriendo tema, para enviar: " + id);
      this.$emit("idTema", id);
    },
    recibirCedula(cedula, id) {
      this.cedula = cedula;
      this.editarTema(cedula,id);
    },
    editarTema(cedula,id) {
      this.$emit("idEditTema",cedula,id);
    },

    
    formatoFecha(fecha) {
      return formatearFecha(fecha);
    },
  },
  mounted() {
    this.cargarForos();
  },
};
</script>

<style scoped>
.contador {
  font-size: x-small;
}
.bi-pencil-square:hover {
  color: rgb(152, 189, 4);
  box-shadow: 2px 2px 2px 0px rgb(105, 130, 4);
}

.bi-x-octagon:hover {
  color: red;
  box-shadow: 2px 2px 2px 0px rgb(142, 2, 2);
}

.detalles {
  display: flex;
  justify-content: center;
  display: grid;
  align-content: center;
  cursor: pointer;
}

.detalles .asunto {
  font-weight: bold;
  font-size: 18px;
}

.detalles .fechaC {
  font-size: 12px;
  color: rgb(145, 145, 145);
}

.contenedor {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid rgb(163, 162, 162);
  margin: 10px;
  border-radius: 15px;
  padding: 10px;
}

.detalles {
  flex-grow: 1;
}

.btn-acciones {
  width: 15%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.btn-acciones button {
  margin: 5px;
}

.btn-acciones button {
  margin: 5px;
}

button {
  border: none;
  background-color: transparent;
  cursor: pointer;
  border-radius: 10px;
}

.contenedor:hover {
  box-shadow: 0px 0px 10px rgba(0, 0, 255, 0.5); /* Cambia los valores según tu preferencia */
}

/*---------------------------*/

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
