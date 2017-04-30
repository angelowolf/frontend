<template>
  <div class="layout-padding">
    <q-data-table
      :data="getUsuarios"
      :config="config"
      :columns="columns"
      @refresh="refresh"
    >
      <!-- Custom renderer for "message" column -->
      <template slot="col-message" scope="cell">
        <span class="light-paragraph">{{cell.data}}</span>
      </template>
      <!-- Custom renderer for "source" column -->
      <template slot="col-source" scope="cell">
        <span v-if="cell.data === 'Audit'" class="label text-white bg-primary">
          Audit
          <q-tooltip>Some data</q-tooltip>
        </span>
        <span v-else class="label text-white bg-negative">{{cell.data}}</span>
      </template>
      <!-- Custom renderer when user selected one or more rows -->
      <template slot="selection" scope="selection">
        <button v-if="selection.rows.length == 1" class="primary clear" @click="changeMessage(selection)">
          <i>edit</i>
        </button>
        <button class="primary clear" @click="deleteRow(selection)">
          <i>delete</i>
        </button>
      </template>
    </q-data-table>
    <button class="primary circular fixed-bottom-right" @click="nuevo()" style="right: 18px; bottom: 18px;">
      <i>add</i>
    </button>
  </div>
</template>

<script>
  import { Platform, Utils, Toast } from 'quasar'
  import { mapActions, mapGetters, mapMutations } from 'vuex'
  import { usuarioUrl } from '../../../configs/urls'
  import axios from 'axios'

  export default {
    name: 'Usuarios',
    created () {
      this.cargarUsuarios()
    },
    mounted () {
      this.setLayoutNeeded(true)
    },
    computed: {
      ...mapGetters([
        'getUsuarios'
      ])
    },
    methods: {
      ...mapActions([ 'cargarUsuarios' ]),
      ...mapMutations(['setLayoutNeeded']),
      changeMessage (props) {
        if (props.rows.length === 1) {
          const usuario = props.rows[0].data
          this.$router.push('/usuario/editar/' + usuario.id)
        }
        else {
          Toast.create('Seleccioná solo uno para editarlo.')
        }
      },
      deleteRow (props) {
        props.rows.forEach(row => {
          // this.table.splice(row.index, 1)
        })
      },
      refresh (done) {
        axios.get(usuarioUrl)
          .then(response => {
            this.$store.commit('SET_ALUMNOS', response.data.data)
            done()
          })
      },
      nuevo () {
        this.$router.push('/usuario/nuevo')
      }
    },
    beforeDestroy () {
      if (this.timeout) {
        clearTimeout(this.timeout)
      }
    },
    data () {
      return {
        config: {
          title: 'Usuarios',
          refresh: true,
          columnPicker: true,
          leftStickyColumns: 2,
          rightStickyColumns: 0,
          bodyStyle: {
            maxHeight: Platform.is.mobile ? '50vh' : '500px'
          },
          rowHeight: '50px',
          responsive: true,
          pagination: {
            rowsPerPage: 15,
            options: [5, 10, 15, 30, 50, 500]
          },
          selection: 'multiple',
          messages: {
            noData: '<i>warning</i> No hay usuarios disponbiles.',
            noDataAfterFiltering: '<i>warning</i> No hay resultados. Refiná tus términos de búsqueda.'
          },
          labels: {
            columns: 'Columnas',
            allCols: 'Todas las cols.',
            rows: 'Filas',
            selected: {
              singular: 'usuario seleccionado.',
              plural: 'usuarios seleccionados.'
            },
            clear: 'Deseleccionar',
            search: 'Buscar',
            all: 'Todos'
          }
        },
        columns: [
          {
            label: 'Nombre',
            field: 'nombre',
            width: '60px',
            filter: true,
            sort: 'text'
          },
          {
            label: 'Apellido',
            field: 'apellido',
            width: '60px',
            sort: 'text'
          },
          {
            label: 'Usuario',
            field: 'usuario',
            width: '60px',
            sort: 'text'
          }
        ],
        pagination: true,
        rowHeight: 50,
        bodyHeightProp: 'maxHeight',
        bodyHeight: 500
      }
    },
    watch: {
      pagination (value) {
        if (!value) {
          this.oldPagination = Utils.clone(this.config.pagination)
          this.config.pagination = false
          return
        }
        this.config.pagination = this.oldPagination
      },
      rowHeight (value) {
        this.config.rowHeight = value + 'px'
      },
      bodyHeight (value) {
        let style = {}
        if (this.bodyHeightProp !== 'auto') {
          style[this.bodyHeightProp] = value + 'px'
        }
        this.config.bodyStyle = style
      },
      bodyHeightProp (value) {
        let style = {}
        if (value !== 'auto') {
          style[value] = this.bodyHeight + 'px'
        }
        this.config.bodyStyle = style
      }
    }
  }
</script>

<style>
  .fixed-bottom-right {
    position: fixed !important;
  }
</style>