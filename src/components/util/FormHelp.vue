<script>
  export default {
    props: {
      'form': {
        required: true
      },
      'nombre': {
        required: true
      }
    }
  }
</script>
<template>
  <span class="help is-danger" v-if="form.errors.has(nombre)">{{form.errors.get(nombre)}}</span>
</template>

<style scoped>
  .help.is-danger {
    display: block;
    font-size: .9rem;
    margin-top: 0.25rem;
    color: #db2828;
  }
</style>
