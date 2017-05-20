<template>
  <div class="list no-border platform-delimiter light-paragraph">
    <q-drawer-link icon="dashboard" :to="{path: '/dashboardAdmin', exact: true}"> Dashboard</q-drawer-link>
    <q-drawer-link icon="people" :to="{path: '/clientesistema', exact: true}"> Clientes</q-drawer-link>    
    <q-drawer-link icon="text_fields" :to="{path: '/dominio', exact: true}"> Dominio</q-drawer-link>    
  </div>
</template>

<script>
  export default {
  }
</script>
<style scoped>
  .list-label:first-child{
    line-height: 50px;
  }
  .router-link-active {
    color: #027be3;
    background-color: #dadada !important;
    border-right: 2px solid #027be3;
  }
  .router-link-active .item-primary{
    color: #027be3;
  }
</style>
