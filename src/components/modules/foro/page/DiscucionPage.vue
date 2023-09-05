<template>
  <TemaDetalle :idTemaBuscar="idTema"></TemaDetalle>
  <Comentario :idTem="idTema" @cedulaComentario="recibirCedul"></Comentario>
  <ListarComentarios :idTemaForo="idTema" :cedula="cedulEn"></ListarComentarios>
</template>

<script>
import Comentario from '../components/Comentario.vue';
import ListarComentarios from '../components/ListarComentarios.vue';
import TemaDetalle from '../components/TemaDetalle.vue';

export default {
  data(){
    return{
       cedulEn:null,
    }
  },
    props:{
       idTema:{
        type: Number,
        required:true
       }
    },
    components: { TemaDetalle, Comentario, ListarComentarios },
    methods:{
      recibirCedul(cedula){
         this.cedulEn = cedula;
      }
    }

}
</script>

<style>

</style>