<template>
  <div class="layout-padding">
    <q-data-table
      :data="getHabitaciones"
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
  import { mapActions, mapGetters } from 'vuex'
  import { habitacionUrl } from '../../../configs/urls'
  import { vueHttp, enviarPeticion } from './../../../configs/servicioRest'

  export default {
    name: 'TipoHabitaciones',
    created () {
      this.cargarHabitaciones()
    },
    computed: {
      ...mapGetters([
        'getHabitaciones'
      ])
    },
    methods: {
      ...mapActions([ 'cargarHabitaciones' ]),
      changeMessage (props) {
        if (props.rows.length === 1) {
          const habitacion = props.rows[0].data
          this.$router.push('/habitacion/editar/' + habitacion.id)
        }
        else {
          Toast.create('Seleccioná solo uno para editarlo.')
        }
      },
      deleteRow (props) {
        props.rows.forEach(row => {
          enviarPeticion('delete', habitacionUrl + row.data.id, null, reponse => {
            this.cargarHabitaciones()
          },
          response => {
          })
        })
      },
      refresh (done) {
        vueHttp('get', habitacionUrl, response => {
          this.$store.commit('SET_HABITACIONES', response.data.datos)
          done()
        })
      },
      nuevo () {
        this.$router.push('/habitacion/nuevo')
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
          title: 'Habitaciones',
          refresh: true,
          columnPicker: true,
          leftStickyColumns: 1,
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
            noData: '<i>warning</i> No hay habitaciones disponbiles.',
            noDataAfterFiltering: '<i>warning</i> No hay resultados. Refiná tus términos de búsqueda.'
          },
          labels: {
            columns: 'Columnas',
            allCols: 'Todas las cols.',
            rows: 'Filas',
            selected: {
              singular: 'Habitación seleccionada.',
              plural: 'Habitaciones seleccionadas.'
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
            label: 'Tipo',
            field: 'tipoHabitacion',
            width: '60px',
            filter: true,
            sort: 'text',
            format (value) {
              return value.nombre
            }
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
