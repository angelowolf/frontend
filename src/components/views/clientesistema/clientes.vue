<template>
  <div class="layout-padding">
    <q-data-table
      :data="getClientesSistema"
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
    <button class="green circular fixed-bottom-right generic-margin" @click="nuevo()">
      <i>add</i>
    </button>
  </div>
</template>

<script>
  import { Dialog, Platform, Utils, Toast } from 'quasar'
  import { mapActions, mapGetters } from 'vuex'
  import { clienteSistemaUrl } from '../../../configs/urls'
  import axios from 'axios'

  export default {
    name: 'Clientes',
    created () {
      this.cargarClientesSistema()
    },
    computed: {
      ...mapGetters([
        'getClientesSistema'
      ])
    },
    methods: {
      ...mapActions([ 'cargarClientesSistema' ]),
      changeMessage (props) {
        if (props.rows.length === 1) {
          const cliente = props.rows[0].data
          this.$router.push('/clientesistema/editar/' + cliente.id)
        }
        else {
          Toast.create('Seleccioná solo uno para editarlo.')
        }
      },
      deleteRow (props) {
        const v = this
        if (props.rows.length === 1) {
          Dialog.create({
            title: 'Atención',
            message: '¿Estás seguro de que querés eliminar este cliente?',
            buttons: [
              'Cancel',
              {
                label: 'Sí',
                classes: 'negative clear',
                handler () {
                  const cliente = props.rows[0].data
                  axios.delete(clienteSistemaUrl + cliente.id)
                    .then(response => {
                      Toast.create('Se eliminó el cliente ' + cliente.titular.nombre + ' ' + cliente.titular.apellido)
                      v.eliminarClienteSistema(cliente)
                      this.refresh()
                    })
                    .catch(() => Toast.create('Ocurrió un error'))
                }
              }
            ]
          })
        }
        else {
          Dialog.create({
            title: 'Atención',
            message: `¿Estás seguro de que querés eliminar ${props.rows.length} clientes?`,
            buttons: [
              'Cancel',
              {
                label: 'Sí',
                classes: 'negative clear',
                handler () {
                  let cliente
                  props.rows.forEach(row => {
                    cliente = row.data
                    axios.delete(clienteSistemaUrl + cliente.id)
                      .then(response => {
                        Toast.create('Se eliminó el cliente ' + cliente.titular.nombre + ' ' + cliente.titular.apellido)
                        v.eliminarClienteSistema(cliente)
                        this.refresh()
                      })
                      .catch(() => Toast.create('Ocurrió un error'))
                  })
                }
              }
            ]
          })
        }
      },
      refresh (done) {
        axios.get(clienteSistemaUrl)
          .then(response => {
            this.$store.commit('SET_CLIENTE_SISTEMA', response.data.datos)
            done()
          })
      },
      nuevo () {
        this.$router.push('/clientesistema/nuevo')
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
          title: 'Clientes',
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
            noData: '<i>warning</i> No hay clientes disponbiles.',
            noDataAfterFiltering: '<i>warning</i> No hay resultados. Refiná tus términos de búsqueda.'
          },
          labels: {
            columns: 'Columnas',
            allCols: 'Todas las cols.',
            rows: 'Filas',
            selected: {
              singular: 'cliente seleccionado.',
              plural: 'clientes seleccionados.'
            },
            clear: 'Deseleccionar',
            search: 'Buscar',
            all: 'Todos'
          }
        },
        columns: [
          {
            label: 'ID',
            field: 'id',
            width: '20px',
            sort: 'text'
          },
          {
            label: 'Nombre',
            field: 'nombre',
            width: '80px',
            sort: 'text'
          },
          {
            label: 'Tipo de Servicio',
            field: 'tipoServicio',
            width: '80px',
            sort: 'text'
          },
          {
            label: 'Titular',
            field: 'titular',
            width: '100px',
            sort: 'text',
            format: (value) => {
              return `<strong>Nombre:</strong> ${value.nombre} ${value.apellido}<br>
              <strong>Documento:</strong> ${value.tipoDocumento} ${value.numeroDocumento}`
            }
          },
          {
            label: 'Usuarios',
            field: 'usuarios',
            width: '60px',
            sort: 'text',
            format: (value) => {
              return value.length
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
