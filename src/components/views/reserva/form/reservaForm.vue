<template>
  <div class="layout-padding">
    <p class="caption">Datos</p>
    <div class="list">
      <div class="row gutter sm-column">
        <div class="auto">
          <div class="item two-lines">
            <i class="item-primary">date_range</i>
            <div class="item-content">
              <div class="floating-label">
                <span>Desde</span>
                <q-datetime v-model="fechaInicio" type="date" class="full-width"></q-datetime>
              </div>
            </div>
          </div>
        </div>
        <div class="auto">
          <div class="item two-lines">
            <i class="item-primary">date_range</i>
            <div class="item-content">
              <div class="floating-label">
                <span>Hasta</span>
                <q-datetime v-model="fechaFin" type="date" class="full-width"></q-datetime>
              </div>
            </div>
          </div>  
        </div>
      </div>

      <div class="row gutter sm-column">
        <div class="auto">
          <div class="item two-lines">
            <i class="item-primary">people</i>
            <div class="item-content">
              <div class="floating-label">
                <span>Cantidad de Adultos</span>
                <q-numeric :min="0" :max="50" class="full-width" v-model="cantidadAdulto"></q-numeric>
              </div>
            </div>
          </div>
        </div>
        <div class="auto">
          <div class="item two-lines">
            <i class="item-primary">child_care</i>
            <div class="item-content">
              <div class="floating-label">
                <span>Cantidad de Niños</span>
                <q-numeric :min="0" :max="50" class="full-width" v-model="cantidadMenores"></q-numeric>
              </div>
            </div>
          </div>  
        </div>
      </div>

      <div class="item two-lines">
        <i class="item-primary">supervisor_account</i>
        <div class="item-content">
          <span>Habitación</span>
          <q-select class="full-width" type="list" v-model="habitacion.id" :options="getHabitacionesSelect" ok-label="Pick" cancel-label="Neah" title="Company"></q-select>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'ReservaForm',
    props: ['nuevaReserva'],
    computed: {
      ...mapGetters([
        'getHabitacionesSelect'
      ])
    },
    data () {
      return {
        cantidadAdulto: 0,
        cantidadMenores: 0,
        habitacion: {
          id: 0
        },
        fechaFin: '',
        fechaInicio: '',
        datos: {}
      }
    },
    methods: {
      ...mapActions([
        'cargarHabitaciones'
      ])
    },
    created () {
      this.cargarHabitaciones()
      this.datos = JSON.parse(JSON.stringify(this.nuevaReserva))
      this.habitacion = JSON.parse(JSON.stringify(this.nuevaReserva.habitacion))
      this.fechaFin = this.nuevaReserva.end.format()
      this.fechaInicio = this.nuevaReserva.start.format()
    }
  }
</script>
