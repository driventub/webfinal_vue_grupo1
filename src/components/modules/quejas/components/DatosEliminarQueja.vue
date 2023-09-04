<template>
    <label for="">Id</label>
        <input v-model="id" type="text" :disabled="isDisabled"/>
        <button class="btn btn-warning" @click="consultaQueja">Verificar</button>

        <h3 v-if="verif">nombre: {{ nombre }}     , asunto: {{ asunto }}</h3>
        <button class="btn btn-danger" @click="eliminarQueja" v-if="verif">Eliminar</button>
        
        <h3 v-if="mensaje">{{ mensaje2 }}</h3>

</template>

<script>
import { eliminarQuejaFachada } from '../helpers/QuejaCliente';
import {obtenerQuejaFachada} from '../helpers/QuejaCliente'
    export default {
        data(){
            return{
                verif:false,
                id:null,
                nombre:null,
                asunto:null,

                mensaje:false,
                mensaje2:null
            };
        },
        methods:{
            async eliminarQueja(){
                this.isDisabled = !this.isDisabled;
                this.verif=false;
                try{
                    await eliminarQuejaFachada(this.id)
                    this.mensaje=true;
                    this.mensaje2='Exito: Queja eliminada exitosamente'
                }catch(error){
                    this.mensaje=true;
                    this.mensaje2=error+': Error de API al eliminar'
                }
                
            },
            async consultaQueja() {
                this.isDisabled = !this.isDisabled;
                this.mensaje=false;

                if(this.id===null || this.id===''){
                    this.isDisabled = !this.isDisabled;
                    this.mensaje=true
                    this.mensaje2='Error: Id vacio'
                }else{
                    try{
                        const data = await obtenerQuejaFachada(this.id);
                        this.nombre = data.nombre;
                        this.asunto = data.asunto;
                        this.verif=true;
                    }catch(error){
                        this.isDisabled = !this.isDisabled;
                        this.mensaje=true;
                        this.mensaje2=error+': Error de API al consultar'
                    }
                    
                }

            },
        }

    }
</script>

<style scoped>
    input{
        margin-left: 5px;
        margin-left: 5px;
    }
</style>