<template>
  <div class="top-div">
    <div class="input-group">
      <div class="input-group-prepend">
        <span class="input-group-text">
          <i class="bi bi-search"></i>
        </span>
      </div>
      <input v-model="asuntoBusqueda" type="text" class="form-control" 
      placeholder="Escribe asunto..." 
      @input="realizarBusqueda"
      required />
    </div>

    
    <div>
      <button class="btn btn-outline-primary" @click="anadirForo">Añadir un nuevo tema de debate</button>
    </div>
  </div>
</template>

<script>
export default {
    data(){
       return{
        asuntoBusqueda:'',
        longitudAnterior:0,
       }
    },
  methods: {
    anadirForo() {
      this.$emit("anadir", true);
      console.log("click en anadir");
    },
    realizarBusqueda(){
      //  console.log("trim: "+this.asuntoBusqueda.trim());
        if(this.asuntoBusqueda.trim()===''){
         this.$emit("muestraFiltro",false);
        }else{
            this.$emit("muestraFiltro",true);
            this.$emit("asuntoSMG",this.asuntoBusqueda);
        }
    }
  },
};
</script>

<style scoped>

.top-div{
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  overflow-y: hidden !important; /*Evita el desplazamiento vertical*/
  border-bottom: 2px solid rgb(173, 173, 173);
  background-color: RGBA(2, 203, 237, 0.1);
}
.input-group{
  width: 40%;
}
</style>
