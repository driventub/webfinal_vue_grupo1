<template>

<div v-if="!exito">
    <div>
        <label for="">Id</label>
        <input v-model="id" type="text" :disabled="isDisabled" placeholder="ingrese un id..."/>
    </div>

    <div class="botonConsulta">
        <button class="btn btn-warning" @click="consultaQueja">Consultar</button>
    </div>
    
    <label for="">Nombre</label>
    <input v-model="nombre" type="text" />

    <label for="">Asunto</label>
    <input v-model="asunto" type="text" />
    
    <div class="cuerpo">
      <label for="">Cuerpo</label>
      <div>
        <textarea v-model="cuerpo" rows="5" cols="40"></textarea>
      </div>
    </div>

    <div>
        <button class="btn btn-warning" @click="actualizarQueja" >Actualizar</button>
    </div>
</div>

<div v-if="exito">

    <h3>{{ mensaje }}</h3>

</div>

</template>

<script>
import { actualizarQuejaFachada ,obtenerQuejaFachada} from '../helpers/QuejaCliente';
    export default {
        data(){
            return{
                id:null,
                cuerpo:null,
                nombre:null,
                asunto:null,
                
                mensaje:null,
                exito:false
            };
        },
        methods:{

            async consultaQueja() {

                this.exito=false
                if(this.id===null){
                   this.exito=true
                   this.mensaje='Error: id vacio' 
                }else{
                    try{
                        const data = await obtenerQuejaFachada(this.id);
                        this.nombre = data.nombre;
                        this.asunto = data.asunto;
                        this.cuerpo = data.cuerpo;

                        this.isDisabled = !this.isDisabled;
                    }catch(error){
                        this.exito=true
                        this.mensaje=error+': Id incorrecto'
                    }  
                }
                
            },

           async actualizarQueja(){
                
            if(this.cuerpo===null || this.asunto===null || this.asunto===''|| this.cuerpo===''){
                this.exito=true
                this.mensaje='Error: Datos eliminados o vacios'
            }else{
                const data={
                    id:this.id,
                    cuerpo: this.cuerpo,
                    nombre: this.nombre,
                    asunto:this.asunto,
                }

                try{
                    await actualizarQuejaFachada(data,this.id)

                    this.id=''
                    this.nombre=''
                    this.asunto=''
                    this.cuerpo=''

                    this.exito=true
                    this.mensaje='Actualizacion Exitosa: Queja editada'

                    this.isDisabled = !this.isDisabled;
                }catch(error){
                    this.exito=true
                    this.mensaje=error+': Id invalida o de API'
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
    margin-bottom: 20px;
    font-size: large;
}

</style>