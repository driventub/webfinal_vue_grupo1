<template>
  <div class="contenedorComentario">
    <div>
      <input type="text" placeholder="Cedula de estudiante"
       v-model="cedula" />
      <input
        type="text"
        placeholder="Escribe un comentario"
        v-model="comentario"/>
    </div>
   
    <button @click="comentar">Comentar</button>
  </div>
</template>

<script>
import {guardarComentarioPorForoFachada } from '../helpers/ComentariosCliente';

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
   async comentar(){
    const fechaActual = new Date();
      const fechaActualEnTexto = fechaActual.toISOString();

   const discu ={
       "mensaje":this.comentario,
       "fecha":fechaActualEnTexto
   };

    const data={
      "discuForo":discu,
      "idForo":this.idTem,
      "cedulaEstu":this.cedula,
    };
    const response = await guardarComentarioPorForoFachada(data);
    if(response.status==200){
      alert("Comentario realizado");
    }else{
      alert("Comentario no realizado")
    }
   }
  },
};
</script>

<style scoped>
.contenedorComentario{
border: 1px solid orange;
}

</style>
