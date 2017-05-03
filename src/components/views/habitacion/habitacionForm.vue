<template>
  <div class="layout-padding">
    <form @submit.prevent="submit" @keydown="habitacionNuevo.errors.clear($event.target.name)" novalidate>
      <div class="floating-label">
        <input
        type="text"
        v-model="habitacionNuevo.nombre"
        class="full-width"
        required
        name="nombre"
        v-error="{ form: habitacionNuevo, campo: 'nombre' }"
        >
        <label for="nombre">Nombre</label>
        <form-help nombre="nombre" :form="habitacionNuevo"/>
      </div>
      <div class="item-content">
        <label>
          <q-checkbox
          v-model="habitacionNuevo.camaMatrimonial"
          v-error="{ form: habitacionNuevo, campo: 'nombre' }"></q-checkbox>
          Con cama matrimonial
        </label>
        <form-help nombre="camaMatrimonial" :form="habitacionNuevo"/>

      </div>


      <div class="item-content">
        <span class="item-label">Capacidad: </span>
        <q-numeric
        v-model="habitacionNuevo.capacidad"
        :min="1"
        :max="50"
        v-error="{ form: habitacionNuevo, campo: 'capacidad' }"
        ></q-numeric>
        <form-help nombre="capacidad" :form="habitacionNuevo"/>
      </div>

      <div class="item multiple-lines">
        <span class="item-label">Tipo habitación: </span>
         <div class="item-content">
           <q-select
             class="full-width"
             type="list"
             v-model="habitacionNuevo.tipoHabitacion.id"
             :options="getTipoHabitacionesSelect"
             v-error="{ form: habitacionNuevo, campo: 'tipoHabitacion' }"
           ></q-select>
         </div>
       </div>
       <form-help nombre="tipoHabitacion" :form="habitacionNuevo"/>
      <button class="primary pull-right" type="submit">
        {{ modoEditar ? 'Editar' : 'Registrar' }} Tipo Habitación
      </button>
    </form>
  </div>
</template>
<script>
  import { mapActions, mapGetters } from 'vuex'
  import { habitacionUrl } from '../../../configs/urls'
  import Form from '../../util/Form'
  import { vueHttp, enviarPeticion } from './../../../configs/servicioRest'
  
  export default {
    name: 'FormHabitacion',
    props: ['id'],
    data () {
      return {
        habitacionNuevo: new Form({
          id: '',
          nombre: '',
          capacidad: 1,
          camaMatrimonial: false,
          tipoHabitacion: {
            id: 0
          }
        }),
        modoEditar: false
      }
    },
    computed: {
      ...mapGetters([
        'getTipoHabitacionesSelect'
      ])
    },
    methods: {
      ...mapActions([
        'cargarHabitaciones',
        'cargarTipoHabitaciones'
      ]),
      submit () {
        let accionHttp = this.modoEditar ? 'put' : 'post'
        enviarPeticion(accionHttp, habitacionUrl, this.habitacionNuevo.data(), response => {
          this.$router.push('/habitacion')
          this.cargarHabitaciones()
        },
        response => {
          this.habitacionNuevo.errors.record(response.data.datos.listaValidaciones)
        })
      }
    },
    beforeMount () {
      this.cargarTipoHabitaciones()
      if (this.id !== undefined) {
        vueHttp('get', habitacionUrl + this.id, response => {
          this.habitacionNuevo = new Form(response.data.datos)
        })
        this.modoEditar = true
      }
    }
  }
</script>
