<template>
    <div v-if="!exito">
        <label for="">A nombre de</label>
        <input v-model="nombre" type="text" placeholder=" (opcional)"/>
        
        <label for="">Asunto</label>
        <input v-model="asunto" type="text" placeholder=" asunto..."/>
        
        <div class="cuerpo">
            <label for="">Cuerpo</label >
            <div>
                <textarea v-model="cuerpo" rows="5" cols="40" placeholder=" ingrese su queja aqui..."></textarea>
            </div>
        </div>

        <div>
            <button class="btn btn-warning" @click="guardarQueja">Guardar</button>
        </div>

    </div>

    <div v-if="exito">
            <h1>{{ mensaje }}</h1>
    </div>

</template>

<script>
import { ingresarQuejaFachada } from '../helpers/QuejaCliente'

    export default {
        data(){
            return{
                asunto:null,
                nombre:null,
                cuerpo:null,

                mensaje:null,
                exito: false
            };
        },
        methods:{

            async guardarQueja(){

                if(this.asunto===null || this.cuerpo===null){
                    this.exito=true;
                    this.mensaje='Queja no agregada: datos faltantes'
                }else{

                    if(this.nombre===null || this.nombre===''){
                        this.nombre='Anónimo'
                    }

                    const data={
                        nombre: this.nombre,
                        cuerpo: this.cuerpo,
                        asunto:this.asunto,
                    }

                    try{
                        ingresarQuejaFachada(data);
                        this.exito=true;
                        this.mensaje='Exito: Queja agregada de manera correcta'
                    }catch(error){
                        this.exito=true;
                        this.mensaje=error+': Error de API'
                    }

                }

            }
            
        }
    }
</script>

<style scoped>

    input{
        margin-left: 5px;
        margin-right: 5px;
    }

    button{
        margin-top: 10px;
        font-size: large;
    }

</style>