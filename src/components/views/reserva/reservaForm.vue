<template>
  <div>
    <h4>Basic Modal</h4>
    {{nuevaReserva.start}}{{nuevaReserva.end}}{{nuevaReserva.habitacion}}
        <button class="primary" @click="$emit('cerrarModal')">Close</button>
  </div>  
</template>
<script>
  export default {
    name: 'ReservaForm',
    props: ['nuevaReserva']
  }
</script>
