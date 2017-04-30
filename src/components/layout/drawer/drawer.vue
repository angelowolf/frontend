<template>
  <q-drawer ref="leftDrawer" v-show="getLayoutNeeded">
    <div id="profile">
      <img src="../img/avatar-1.svg" id="avatar" class="inline-block">
      <div id="user-name">
        <span class="text-white">Greldon</span>
        <hr>
      </div>
      <div id="user-actions">
        <button class="bordered blue small" ><i>person</i></button>
        <button class="bordered blue small" ><i>lock</i></button>
        <router-link to="login-one">
          <button class="bordered blue small" ><i>exit_to_app</i></button>
        </router-link>
      </div>
    </div>
    <menu-one v-if="getMenuCollapse" :links="links"></menu-one>
    <menu-two v-else :links="links"></menu-two>

    <div class="fixed-bottom text-center light text-italic">
      Powered by
      <a href="https://vuejs.org/"><img src="../img/vue-logo.png" alt=""></a>
      <a href="http://quasar-framework.org/"><img src="../img/quasar-logo.png" alt=""></a>
    </div>
  </q-drawer>
</template>
<script type="text/javascript">
  import { mapGetters } from 'vuex'
  import menuOne from './menuOne.vue'
  import menuTwo from './menuTwo.vue'
  export default {
    data () {
      return {
        links: {
        }
      }
    },
    computed: {
      ...mapGetters(['getLayoutNeeded', 'getMenuCollapse'])
    },
    components: {
      menuOne,
      menuTwo
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
