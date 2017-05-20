<template>
  <div class="layout-padding">
    <q-data-table
      :data="getDominio"
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
    <button class="green circular fixed-bottom-right generic-margin" @click="nuevo">
      <i>add</i>
    </button>
  </div>
</template>

<script>
  import { Platform, Dialog, Utils, Toast } from 'quasar'
  import { mapActions, mapGetters } from 'vuex'
  import { dominioUrl } from '../../../configs/urls'
  import axios from 'axios'

  export default {
    name: 'Dominio',
    created () {
      this.cargarDominio()
    },
    computed: {
      ...mapGetters([
        'getDominio'
      ])
    },
    methods: {
      ...mapActions([ 'cargarDominio', 'eliminarDominio' ]),
      changeMessage (props) {
        if (props.rows.length === 1) {
          const dominio = props.rows[0].data
          this.$router.push('/dominio/editar/' + dominio.id)
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
            message: '¿Estás seguro de que querés desactivar este dominio?',
            buttons: [
              'Cancel',
              {
                label: 'Sí',
                classes: 'negative clear',
                handler () {
                  const dominio = props.rows[0].data
                  axios.delete(dominioUrl + dominio.id)
                    .then(response => {
                      Toast.create('Se desactivó el dominio con clave ' + dominio.clave)
                      v.eliminarGrado(dominio)
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
            message: `¿Estás seguro de que querés desactivar ${props.rows.length} dominios?`,
            buttons: [
              'Cancel',
              {
                label: 'Sí',
                classes: 'negative clear',
                handler () {
                  let dominio
                  props.rows.forEach(row => {
                    dominio = row.data
                    axios.delete(dominioUrl + dominio.id)
                      .then(response => {
                        Toast.create('Se desactivó el dominio con clave ' + dominio.clave)
                        v.eliminarGrado(dominio)
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
        axios.get(dominioUrl)
          .then(response => {
            this.$store.commit('SET_DOMINIO', response.data.datos)
            done()
          })
      },
      nuevo () {
        this.$router.push('/dominio/nuevo')
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
          title: 'Dominio',
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
            noData: '<i>warning</i> No hay claves disponbiles.',
            noDataAfterFiltering: '<i>warning</i> No hay resultados. Refiná tus términos de búsqueda.'
          },
          labels: {
            columns: 'Columnas',
            allCols: 'Todas las cols.',
            rows: 'Filas',
            selected: {
              singular: 'clave de dominio seleccionada.',
              plural: 'calves de dominio seleccionadas.'
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
            label: 'Dominio',
            field: 'dominio',
            width: '80px',
            sort: 'text'
          },
          {
            label: 'Clave',
            field: 'clave',
            width: '60px',
            sort: 'text'
          },
          {
            label: 'Valor',
            field: 'valor',
            width: '60px',
            sort: 'text'
          },
          {
            label: 'Activo',
            field: 'activo',
            width: '60px',
            sort: 'text',
            format (value) {
              return value ? 'Sí' : 'No'
            }
          },
          {
            label: 'Editable',
            field: 'editable',
            width: '60px',
            sort: 'text',
            format (value) {
              return value ? 'Sí' : 'No'
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
