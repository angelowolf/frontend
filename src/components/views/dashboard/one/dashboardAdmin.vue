<template>
  <div class="layout-padding ">
    <div class="content-header">
        <span id="content-header-title" class="vertical-bottom">Bienvenido, {{getUsuario.nombre}}</span>
      <hr>
    </div>
      <div class="card">
        <div class="card-title bg-primary text-white">
          Colored Card Title
        </div>
        <div class="card-content card-force-top-padding">
          Card Content
        </div>
      </div>

    <div class="flex wrap gutter">
      <div class="width-1of3 sm-auto">
        <cardTotal
          title="Mensajes"
          background-color="bg-teal-9"
          icon-name="local_post_office"
          :total="totalPosts">
        </cardTotal>
      </div>
      <div class="width-1of3 sm-auto">
        <cardTotal
          title="Clientes"
          background-color="bg-teal-7"
          icon-name="comment"
          :total="totalComments">
        </cardTotal>
      </div>
      <div class="width-1of3 sm-auto">
        <cardTotal
          title="Errores"
          background-color="bg-teal-5"
          icon-name="repeat_one"
          :total="0">
        </cardTotal>
      </div>
    </div>
    <div class="flex wrap gutter">
      <div class="width-1of2 lg-width-1of3 sm-auto">
      </div>
      <div class="auto">
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  import cardTotal from './cardTotal.vue'
  import cardTodo from './cardTodo.vue'
  import { mapGetters, mapMutations } from 'vuex'
  export default {
    name: 'Inicio',
    mounted () {
      this.setLayoutNeeded(true)
    },
    data () {
      return {
        totalPosts: 0,
        totalComments: 0,
        totalTodos: 0
      }
    },
    computed: {
      ...mapGetters(['getUsuario'])
    },
    methods: {
      ...mapMutations(['setLayoutNeeded'])
    },
    components: {
      cardTotal,
      cardTodo
    }
  }
</script>
<style></style>
