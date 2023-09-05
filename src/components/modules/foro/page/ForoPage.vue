<template>
  <div class="container">
    <div class="top-div">
      <AnadirForo
        @anadir="anadirForo"
        @muestraFiltro="mostrarPorFiltro"
        @asuntoSMG="cargarAsunto"
      ></AnadirForo>
    </div>

    <div class="center-div">
      <CrearForo :isMostrar="isForo" @cancelar="cancel"></CrearForo>
      <ListarForos
        v-if="mostrarListaP"
        @numForos="contarForos"
        @idTema="enviarIDTema"
        @idEditTema="enviarIdActu"
     
      ></ListarForos>
      <ListarPorAsunto
        v-if="porFiltro"
        :asunto="asuntoFiltro"
      ></ListarPorAsunto>

      <DiscucionPage v-if="temaDiscu" :idTema="idTemaForo"></DiscucionPage>

      <ForoActualizar v-if="temaActu" :idTema="idTemaActu" :cedula="cedulaActu" @cancelarUpdate="cancelUpdate"></ForoActualizar>
      
    </div>
    <div v-if="temasDebate" class="alert alert-success" role="alert">
      Aun no hay temas de debate en este foro.
    </div>
    <div v-else-if="!temasDebate" class="alert alert-success" role="alert">
      Existen {{ nForos }} temas de debate.
    </div>
  </div>
</template>

<script>
import AnadirForo from "../components/AnadirForo.vue";
import CrearForo from "../components/CrearForo.vue";
import ForoActualizar from "../components/ForoActualizar.vue";
import ListarForos from "../components/ListarForos.vue";
import ListarPorAsunto from "../components/ListarPorAsunto.vue";
import DiscucionPage from "./DiscucionPage.vue";

export default {
  components: {
    CrearForo,
    ListarForos,
    AnadirForo,
    ListarPorAsunto,
    DiscucionPage,
    ForoActualizar,
    DiscucionPage,
  },
  data() {
    return {
      temasDebate: true,
      nForos: null,
      isForo: false,
      porFiltro: false,
      asuntoFiltro: null,
      mostrarListaP: true,

      idTemaForo: null,
      temaDiscu: false,

      idTemaActu: null,
      temaActu: false,

      cedulaActu:null,

      cancelarActualizacionPadre:false,
    };
  },
  methods: {
    cancelUpdate(){
        this.cancelarActualizacionPadre = true;
    },
    contarForos(value) {
      this.nForos = value;
      console.log("numeo de foros: " + this.nForos);
      if (this.nForos == 0) {
        this.temasDebate = true;
      } else {
        this.temasDebate = false;
      }
    },
    anadirForo(value) {
      console.log("llegago para anadir" + value);
      this.isForo = value;

      this.mostrarListaP = false;
      this.porFiltro = false;
      this.temaDiscu = false;
      this.idTemaForo = false;
      this.temaActu = false;
    },
    cancel(value) {
      if (value) {
        this.isForo = !this.isForo;
        this.mostrarListaP = true;
      }
    },
    
    enviarIDTema(value) {
      console.log("recibiendo en el padre: " + value);
      this.idTemaForo = value;
      this.mostrarListaP = false;
      this.porFiltro = false;
      this.temaDiscu = true;
      this.isForo = false;
    },

    enviarIdActu(cedula,id) {
      console.log("Recibiendo datos para actualizar en el padre: "+cedula+" id: "+id);
      this.idTemaActu = id;
      this.cedulaActu = cedula;
      console.log("Recibiendo datos para actualizar en el padre cargando datos a las variables: "+this.idTemaActu+" cedula: "+this.cedulaActu);
      this.temaActu = true;
      this.mostrarListaP = false;
      this.porFiltro = false;
      this.temaDiscu = false;
      this.isForo = false;
    },

    mostrarPorFiltro(value) {
      console.log("valor del emit: " + value);
      if (value) {
        this.porFiltro = true;
        this.mostrarListaP = false;
        this.temaDiscu = false;
        this.temaActu = false;
        this.isForo = false;
      } else {
        this.porFiltro = false;
        this.mostrarListaP = true;
        this.temaDiscu = false;
        this.temaActu = false;
        this.isForo = false;
      }
    },
    cargarAsunto(value) {
      this.asuntoFiltro = value;
      console.log("asunto: " + this.asuntoFiltro);
    },
  },
};
</script>

<style scoped>
.container{
  width: 60%;
}

</style>
