<template>
  <div >
    <q-tabs :refs="$refs" v-model="tabSeleccionado">
      <q-tab name="datos-reserva" icon="message" class="justified">
        Reserva
      </q-tab>
      <q-tab name="pasajeros-reserva" icon="fingerprint">
        Pasajeros
      </q-tab>
    </q-tabs>
    <div ref="datos-reserva">
      <reserva-form :nuevaReserva="nuevaReserva" v-if="tabSeleccionado == 'datos-reserva'"></reserva-form>
    </div>
    <div ref="pasajeros-reserva">
    </div>
      <button class="primary fixed-bottom-left generic-margin" @click="$emit('cerrarModal')">Cancelar</button>
  </div>  
</template>
<script>
  import ReservaForm from './reservaForm'
  
  export default {
    components: {ReservaForm},
    name: 'ReservaModal',
    props: ['nuevaReserva'],
    data () {
      return {
        tabSeleccionado: 'datos-reserva'
      }
    }
  }
</script>
