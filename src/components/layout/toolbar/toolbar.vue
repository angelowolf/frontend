<template>
  <div class="toolbar" v-show="getLayoutNeeded">
    <q-ajax-bar color="#80cbc4"></q-ajax-bar>
    <router-link :to="'/'" v-if="$router.currentRoute.meta.backButton">
      <button>
        <i>arrow_back</i>
      </button>
    </router-link>
    <button class="hide-on-drawer-visible" @click="leftDrawer.open()" v-else >
      <i>menu</i>
    </button>
    <q-toolbar-title :padding="1">
      Gestor Reservas
    </q-toolbar-title>
    <div class="right-items">
      <message-popover></message-popover>     
      <a href="https://github.com/odranoelBR/vue-quasar-admin-example" class="text-white">
        <i class="fa fa-2x fa-github"></i>
      </a>
    </div>
  </div>
</template>
<script type="text/javascript">
  import { mapGetters } from 'vuex'
  import messagePopover from './messagePopover.vue'
  export default {
    computed: {
      ...mapGetters(['getLayoutNeeded']),
      leftDrawer () {
        return this.$parent.$children[1].$refs.leftDrawer
      }
    },
    components: {
      messagePopover
    }
  }
</script>
<style scoped>
  .toolbar{
    min-height: 60px;
  }
  .right-items a, .right-items button{
    margin-right: 10px;
  }
</style>
