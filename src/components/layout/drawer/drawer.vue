<template>
  <q-drawer ref="leftDrawer" v-show="getLayoutNeeded">
    <div id="profile">
      <img src="../img/avatar-1.svg" id="avatar" class="inline-block">
      <div id="user-name">
        <span class="text-white">{{getNombreUsuario}}</span>
        <hr>
      </div>
      <div id="user-actions">
        <router-link to="i">
          <button class="bordered blue small" ><i>person</i></button>
        </router-link>
        <button class="bordered blue small" ><i>lock</i></button>
        <button class="bordered blue small" @click="logout"><i>exit_to_app</i></button>
      </div>
    </div>
    <menu-admin v-if="getMenuCollapse" v-permiso="{nombre:'administrador'}"></menu-admin>
    <menu-one v-if="getMenuCollapse" :links="links" v-permiso="{nombre:'cliente'}"></menu-one>
    <menu-two v-else :links="links" v-permiso="{nombre:'cliente'}"></menu-two>

    <div class="fixed-bottom text-center light text-italic">
      <!--Powered by
      <a href="https://vuejs.org/"><img src="../img/vue-logo.png" alt=""></a>
      <a href="http://quasar-framework.org/"><img src="../img/quasar-logo.png" alt=""></a>
      -->
    </div>
  </q-drawer>
</template>
<script type="text/javascript">
  import { mapGetters } from 'vuex'
  import menuOne from './menuOne.vue'
  import menuTwo from './menuTwo.vue'
  import menuAdmin from './menuAdmin.vue'
  export default {
    data () {
      return {
        links: {
        }
      }
    },
    computed: {
      ...mapGetters(['getLayoutNeeded', 'getMenuCollapse', 'getNombreUsuario'])
    },
    components: {
      menuOne,
      menuTwo,
      menuAdmin
    },
    methods: {
      logout () {
        window.localStorage.removeItem('token')
        window.localStorage.removeItem('usuario')
        window.localStorage.removeItem('grupos')
        this.$router.push('/')
      }
    }
  }
</script>
<style scoped>
  .fixed-bottom {
    margin-bottom: 1%;
  }

  .fixed-bottom a img {
    width: 25px;
    height: 25px;
  }
  #avatar{
    padding: 20px;
  }
  #profile {
    height: 130px;
    background-color: #009688;
  }
  #user-name {
    left: 90px;
    bottom: 77px;
    position: relative;
    width: 159px;
    text-transform: capitalize;
  }
  #user-actions {
    left: 90px;
    bottom: 71px;
    position: relative;
    width: 171px;
  }
  #menu-collapse {
    margin-top: 5%;
  }
</style>
