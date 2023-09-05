<template>
  <TemaDetalle :idTemaBuscar="idTema"></TemaDetalle>
  <Comentario :idTem="idTema"></Comentario>
  <ListarComentarios :idTemaForo="idTema"></ListarComentarios>
</template>

<script>
import Comentario from '../components/Comentario.vue';
import ListarComentarios from '../components/ListarComentarios.vue';
import TemaDetalle from '../components/TemaDetalle.vue';

export default {
    props:{
       idTema:{
        type: Number,
        required:true
       }
    },
    components: { TemaDetalle, Comentario, ListarComentarios }
}
</script>

<style>

</style>